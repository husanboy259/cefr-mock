import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

// Generic select query helper
export async function query<T = any>(
  table: string,
  options?: {
    select?: string;
    filters?: Record<string, any>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
    offset?: number;
  }
): Promise<T[]> {
  let q = supabase.from(table).select(options?.select ?? '*');

  if (options?.filters) {
    for (const [key, value] of Object.entries(options.filters)) {
      if (value !== undefined && value !== null) q = q.eq(key, value);
    }
  }
  if (options?.order) {
    q = q.order(options.order.column, { ascending: options.order.ascending ?? true });
  }
  if (options?.limit)  q = q.limit(options.limit);
  if (options?.offset) q = q.range(options.offset, options.offset + (options.limit ?? 20) - 1);

  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as T[];
}

export async function queryOne<T = any>(
  table: string,
  options?: Parameters<typeof query>[1]
): Promise<T | null> {
  const rows = await query<T>(table, { ...options, limit: 1 });
  return rows[0] ?? null;
}

// Raw insert helper
export async function insert<T = any>(table: string, data: Record<string, any>): Promise<T> {
  const { data: row, error } = await supabase.from(table).insert(data).select().single();
  if (error) throw new Error(error.message);
  return row as T;
}

// Raw update helper
export async function update<T = any>(
  table: string,
  data: Record<string, any>,
  filters: Record<string, any>
): Promise<T> {
  let q = supabase.from(table).update(data);
  for (const [key, value] of Object.entries(filters)) q = q.eq(key, value);
  const { data: row, error } = await q.select().single();
  if (error) throw new Error(error.message);
  return row as T;
}

// Raw delete helper
export async function remove(table: string, filters: Record<string, any>): Promise<void> {
  let q = supabase.from(table).delete();
  for (const [key, value] of Object.entries(filters)) q = q.eq(key, value);
  const { error } = await q;
  if (error) throw new Error(error.message);
}

// Count helper
export async function count(table: string, filters?: Record<string, any>): Promise<number> {
  let q = supabase.from(table).select('*', { count: 'exact', head: true });
  if (filters) {
    for (const [key, value] of Object.entries(filters)) q = q.eq(key, value);
  }
  const { count: c, error } = await q;
  if (error) throw new Error(error.message);
  return c ?? 0;
}
