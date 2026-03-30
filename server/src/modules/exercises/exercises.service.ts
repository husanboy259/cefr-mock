import { supabase } from '../../config/database';
import { NotFoundError } from '../../shared/errors';

export async function listExercises(filters: {
  type?: string; level?: string; category?: string;
  search?: string; featured?: string; page?: number; limit?: number;
}) {
  const { type, level, search, featured, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  let q = supabase
    .from('exercises')
    .select('id, type, level, difficulty, title, description, thumbnail_url, tags, estimated_minutes, total_attempts, avg_score, is_featured, categories(name), languages(code)', { count: 'exact' })
    .eq('is_published', true);

  if (type)            q = q.eq('type', type);
  if (level)           q = q.eq('level', level);
  if (featured === 'true') q = q.eq('is_featured', true);
  if (search)          q = q.ilike('title', `%${search}%`);

  q = q.order('is_featured', { ascending: false })
       .order('created_at', { ascending: false })
       .range(offset, offset + limit - 1);

  const { data, error, count } = await q;
  if (error) throw new Error(error.message);

  return { data: data ?? [], total: count ?? 0, page, limit };
}

export async function getExercise(id: string) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*, categories(name, slug), languages(code)')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error || !data) throw new NotFoundError('Exercise');
  return data;
}

export async function getExerciseContent(id: string) {
  const { data: exercise, error } = await supabase
    .from('exercises')
    .select('*, categories(name), languages(code)')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error || !exercise) throw new NotFoundError('Exercise');

  let content: any = {};

  if (exercise.type === 'reading') {
    const { data: passages } = await supabase
      .from('reading_passages')
      .select('*')
      .eq('exercise_id', id)
      .order('sort_order');

    const { data: questions } = await supabase
      .from('questions')
      .select('*, answer_options(*)')
      .eq('exercise_id', id)
      .order('sort_order');

    content = { passages, questions };
  } else if (exercise.type === 'listening') {
    const { data: tracks } = await supabase
      .from('listening_tracks')
      .select('*')
      .eq('exercise_id', id)
      .order('sort_order');

    const { data: questions } = await supabase
      .from('questions')
      .select('*, answer_options(*)')
      .eq('exercise_id', id)
      .order('sort_order');

    content = { tracks, questions };
  } else if (exercise.type === 'writing') {
    const { data: task } = await supabase
      .from('writing_tasks')
      .select('*')
      .eq('exercise_id', id)
      .single();
    content = { task };
  } else if (exercise.type === 'speaking') {
    const { data: task } = await supabase
      .from('speaking_tasks')
      .select('*')
      .eq('exercise_id', id)
      .single();
    content = { task };
  }

  return { ...exercise, content };
}

export async function toggleBookmark(userId: string, exerciseId: string) {
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('exercise_id', exerciseId)
    .limit(1);

  if (existing && existing.length > 0) {
    await supabase.from('bookmarks').delete().eq('user_id', userId).eq('exercise_id', exerciseId);
    return { bookmarked: false };
  }
  await supabase.from('bookmarks').insert({ user_id: userId, exercise_id: exerciseId });
  return { bookmarked: true };
}

export async function getUserBookmarks(userId: string) {
  const { data } = await supabase
    .from('bookmarks')
    .select('created_at, exercises(id, type, level, title, thumbnail_url, avg_score)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return data ?? [];
}
