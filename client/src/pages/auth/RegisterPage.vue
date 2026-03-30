<template>
  <div class="auth-page">
    <div class="auth-card card">
      <h1 class="auth-title">Create your account</h1>
      <p class="text-muted">Free forever — no credit card needed</p>

      <form class="auth-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input v-model="form.username" type="text" class="form-input" placeholder="johndoe" required minlength="3" maxlength="50" />
        </div>
        <div class="form-group">
          <label class="form-label">Full Name (optional)</label>
          <input v-model="form.full_name" type="text" class="form-input" placeholder="John Doe" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-input" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-input" placeholder="Min 8 characters" required minlength="8" />
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <button type="submit" class="btn btn-primary btn-full" :disabled="auth.loading">
          {{ auth.loading ? 'Creating account…' : 'Create Account' }}
        </button>
      </form>

      <div class="auth-links">
        Already have an account? <RouterLink to="/login">Sign in</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();
const router = useRouter();
const form = ref({ username: '', email: '', password: '', full_name: '' });
const error = ref('');

async function handleRegister() {
  error.value = '';
  try {
    await auth.register(form.value);
    router.push('/dashboard');
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Registration failed';
  }
}
</script>

<style scoped>
.auth-page { min-height: 80vh; display: grid; place-items: center; padding: 2rem; }
.auth-card { width: 100%; max-width: 420px; }
.auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
.auth-form { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; }
.btn-full { width: 100%; justify-content: center; }
.auth-links { text-align: center; font-size: 0.875rem; color: var(--text-muted); }
.auth-links a { color: var(--primary); }
</style>
