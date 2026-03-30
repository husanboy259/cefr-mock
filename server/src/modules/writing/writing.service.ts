import { supabase } from '../../config/database';
import { NotFoundError, ValidationError } from '../../shared/errors';

export async function getTask(exerciseId: string) {
  const { data, error } = await supabase
    .from('writing_tasks')
    .select('*')
    .eq('exercise_id', exerciseId)
    .single();

  if (error || !data) throw new NotFoundError('Writing task');
  return data;
}

export async function submit(userId: string, exerciseId: string, taskId: string, body: string) {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

  const { data: task } = await supabase
    .from('writing_tasks')
    .select('min_words, max_words')
    .eq('id', taskId)
    .eq('exercise_id', exerciseId)
    .single();

  if (!task) throw new NotFoundError('Writing task');
  if (wordCount < task.min_words) throw new ValidationError(`Minimum ${task.min_words} words required`);
  if (wordCount > task.max_words) throw new ValidationError(`Maximum ${task.max_words} words allowed`);

  const { data, error } = await supabase
    .from('writing_submissions')
    .insert({ user_id: userId, exercise_id: exerciseId, task_id: taskId, body, word_count: wordCount })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getUserSubmissions(userId: string) {
  const { data } = await supabase
    .from('writing_submissions')
    .select('*, exercises(title, level)')
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false });

  return data ?? [];
}

export async function getSubmission(userId: string, id: string) {
  const { data } = await supabase
    .from('writing_submissions')
    .select('*, exercises(title, level), writing_tasks(prompt, example_answer, criteria)')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (!data) throw new NotFoundError('Submission');
  return data;
}
