import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';

import authRouter      from './modules/auth/auth.router';
import exercisesRouter from './modules/exercises/exercises.router';
import quizRouter      from './modules/quiz/quiz.router';
import writingRouter   from './modules/writing/writing.router';
import speakingRouter  from './modules/speaking/speaking.router';
import progressRouter  from './modules/progress/progress.router';
import adminRouter     from './modules/admin/admin.router';

const app = express();

app.use(helmet());
const allowedOrigins = [env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:4173', 'https://cefr-mock-gpxy.vercel.app'].filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

// Rate limiting
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false }));
app.use('/api', rateLimit({ windowMs: 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }));

// Static uploads
app.use('/uploads', express.static(path.resolve(env.UPLOAD_DIR)));

// Routes
app.use('/api/auth',      authRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/quiz',      quizRouter);
app.use('/api/writing',   writingRouter);
app.use('/api/speaking',  speakingRouter);
app.use('/api/progress',  progressRouter);
app.use('/api/admin',     adminRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
