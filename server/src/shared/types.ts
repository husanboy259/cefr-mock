export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type ExerciseType = 'reading' | 'writing' | 'listening' | 'speaking';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type SubmissionStatus = 'pending' | 'auto_graded' | 'manual_review' | 'graded' | 'rejected';

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuthRequest extends Express.Request {
  user?: Pick<User, 'id' | 'email' | 'username' | 'is_admin'>;
}
