import app from './app';
import { env } from './config/env';
import { supabase } from './config/database';

async function main() {
  // Verify Supabase connection
  const { error } = await supabase.from('languages').select('id').limit(1);
  if (error) {
    console.error('Supabase connection failed:', error.message);
    process.exit(1);
  }
  console.log('Supabase connected');

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
