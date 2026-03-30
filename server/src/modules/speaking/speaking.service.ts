import { supabase } from '../../config/database';
import { NotFoundError } from '../../shared/errors';

export async function getTask(exerciseId: string) {
  const { data, error } = await supabase
    .from('speaking_tasks')
    .select('*')
    .eq('exercise_id', exerciseId)
    .single();

  if (error || !data) throw new NotFoundError('Speaking task');
  return data;
}

export async function submit(userId: string, exerciseId: string, taskId: string, audioUrl: string, durationSec?: number, fileSizeBytes?: number) {
  const { data, error } = await supabase
    .from('speaking_submissions')
    .insert({ user_id: userId, exercise_id: exerciseId, task_id: taskId, audio_url: audioUrl, duration_sec: durationSec ?? null, file_size_bytes: fileSizeBytes ?? null })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getUserSubmissions(userId: string) {
  const { data } = await supabase
    .from('speaking_submissions')
    .select('*, exercises(title, level)')
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false });

  return data ?? [];
}

export async function getSubmission(userId: string, id: string) {
  const { data } = await supabase
    .from('speaking_submissions')
    .select('*, exercises(title, level), speaking_tasks(prompt, example_audio_url, criteria)')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (!data) throw new NotFoundError('Submission');
  return data;
}
