import { supabase } from '../../config/database';
import { NotFoundError, ValidationError, ForbiddenError } from '../../shared/errors';

export async function startAttempt(userId: string, exerciseId: string) {
  const { data: exercise } = await supabase
    .from('exercises')
    .select('type')
    .eq('id', exerciseId)
    .eq('is_published', true)
    .single();

  if (!exercise) throw new NotFoundError('Exercise');
  if (!['reading', 'listening'].includes(exercise.type))
    throw new ValidationError('Quiz is only for reading and listening exercises');

  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({ user_id: userId, exercise_id: exerciseId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function submitAnswer(userId: string, attemptId: string, questionId: string, selectedOption?: string, textAnswer?: string) {
  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('id', attemptId)
    .single();

  if (!attempt) throw new NotFoundError('Attempt');
  if (attempt.user_id !== userId) throw new ForbiddenError();
  if (attempt.status !== 'in_progress') throw new ValidationError('Attempt already completed');

  const { data: question } = await supabase
    .from('questions')
    .select('*')
    .eq('id', questionId)
    .eq('exercise_id', attempt.exercise_id)
    .single();

  if (!question) throw new NotFoundError('Question');

  let isCorrect = false;
  let pointsEarned = 0;

  if (selectedOption) {
    const { data: option } = await supabase
      .from('answer_options')
      .select('is_correct')
      .eq('id', selectedOption)
      .eq('question_id', questionId)
      .single();

    isCorrect = option?.is_correct ?? false;
    pointsEarned = isCorrect ? question.points : 0;
  }

  const { error } = await supabase.from('quiz_answers').upsert({
    attempt_id: attemptId,
    question_id: questionId,
    selected_option: selectedOption ?? null,
    text_answer: textAnswer ?? null,
    is_correct: isCorrect,
    points_earned: pointsEarned,
  }, { onConflict: 'attempt_id,question_id' });

  if (error) throw new Error(error.message);
  return { isCorrect, pointsEarned };
}

export async function submitAttempt(userId: string, attemptId: string) {
  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('id', attemptId)
    .single();

  if (!attempt) throw new NotFoundError('Attempt');
  if (attempt.user_id !== userId) throw new ForbiddenError();
  if (attempt.status !== 'in_progress') throw new ValidationError('Attempt already completed');

  // Get all questions for this exercise
  const { data: questions } = await supabase
    .from('questions')
    .select('id, points')
    .eq('exercise_id', attempt.exercise_id);

  // Get all answers for this attempt
  const { data: answers } = await supabase
    .from('quiz_answers')
    .select('points_earned')
    .eq('attempt_id', attemptId);

  const maxScore = (questions ?? []).reduce((sum: number, q: any) => sum + q.points, 0);
  const score    = (answers ?? []).reduce((sum: number, a: any) => sum + Number(a.points_earned), 0);
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const timeTaken = Math.floor((Date.now() - new Date(attempt.started_at).getTime()) / 1000);

  const { data: updated, error } = await supabase
    .from('quiz_attempts')
    .update({ status: 'completed', score, max_score: maxScore, percentage, time_taken_sec: timeTaken, completed_at: new Date().toISOString() })
    .eq('id', attemptId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Upsert user_progress
  await supabase.from('user_progress').upsert({
    user_id: userId,
    exercise_id: attempt.exercise_id,
    best_score: score,
    best_percentage: percentage,
    total_attempts: 1,
    last_attempt_at: new Date().toISOString(),
    completed: percentage >= 70,
    completed_at: percentage >= 70 ? new Date().toISOString() : null,
  }, { onConflict: 'user_id,exercise_id', ignoreDuplicates: false });

  return updated;
}

export async function getResult(userId: string, attemptId: string) {
  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('id', attemptId)
    .eq('user_id', userId)
    .single();

  if (!attempt) throw new NotFoundError('Attempt');

  const { data: answers } = await supabase
    .from('quiz_answers')
    .select('*, questions(question_text, explanation, points), answer_options(option_text)')
    .eq('attempt_id', attemptId);

  return { ...attempt, answers: answers ?? [] };
}

export async function getHistory(userId: string) {
  const { data } = await supabase
    .from('quiz_attempts')
    .select('*, exercises(title, type, level)')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(50);

  return data ?? [];
}
