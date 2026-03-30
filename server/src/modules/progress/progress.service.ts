import { supabase } from '../../config/database';

export async function getDashboard(userId: string) {
  const [
    { count: exercisesCompleted },
    { count: quizzesTaken },
    { data: quizScores },
    { count: writingSubmitted },
    { count: speakingSubmitted },
    { data: streak },
    { data: recentQuiz },
    { data: recentWriting },
    { data: recentSpeaking },
  ] = await Promise.all([
    supabase.from('user_progress').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('completed', true),
    supabase.from('quiz_attempts').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('quiz_attempts').select('percentage').eq('user_id', userId).eq('status', 'completed'),
    supabase.from('writing_submissions').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('speaking_submissions').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('user_streaks').select('current_streak, longest_streak').eq('user_id', userId).single(),
    supabase.from('quiz_attempts').select('percentage, completed_at, exercises(title)').eq('user_id', userId).eq('status', 'completed').order('completed_at', { ascending: false }).limit(5),
    supabase.from('writing_submissions').select('score, submitted_at, exercises(title)').eq('user_id', userId).order('submitted_at', { ascending: false }).limit(3),
    supabase.from('speaking_submissions').select('score, submitted_at, exercises(title)').eq('user_id', userId).order('submitted_at', { ascending: false }).limit(2),
  ]);

  const avgScore = quizScores && quizScores.length > 0
    ? Math.round(quizScores.reduce((s: number, r: any) => s + Number(r.percentage), 0) / quizScores.length)
    : null;

  const recentActivity = [
    ...(recentQuiz ?? []).map((r: any) => ({ type: 'quiz', title: r.exercises?.title, score: r.percentage, date: r.completed_at })),
    ...(recentWriting ?? []).map((r: any) => ({ type: 'writing', title: r.exercises?.title, score: r.score, date: r.submitted_at })),
    ...(recentSpeaking ?? []).map((r: any) => ({ type: 'speaking', title: r.exercises?.title, score: r.score, date: r.submitted_at })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return {
    stats: { exercises_completed: exercisesCompleted ?? 0, quizzes_taken: quizzesTaken ?? 0, avg_quiz_score: avgScore, writing_submitted: writingSubmitted ?? 0, speaking_submitted: speakingSubmitted ?? 0 },
    streak: streak ?? { current_streak: 0, longest_streak: 0 },
    recentActivity,
  };
}

export async function getLevelStats(userId: string) {
  const { data } = await supabase
    .from('user_level_stats')
    .select('level, exercise_type, exercises_done, avg_score, total_points')
    .eq('user_id', userId)
    .order('level');
  return data ?? [];
}

export async function getExerciseProgress(userId: string) {
  const { data } = await supabase
    .from('user_progress')
    .select('*, exercises(title, type, level)')
    .eq('user_id', userId)
    .order('last_attempt_at', { ascending: false });
  return data ?? [];
}

export async function getDailyActivity(userId: string) {
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const { data } = await supabase
    .from('daily_activity')
    .select('activity_date, exercises_completed, points_earned')
    .eq('user_id', userId)
    .gte('activity_date', ninetyDaysAgo)
    .order('activity_date');
  return data ?? [];
}
