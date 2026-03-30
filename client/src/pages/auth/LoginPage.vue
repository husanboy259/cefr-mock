<template>
  <div class="auth-page">
    <div class="auth-card card">
      <h1 class="auth-title">Welcome back</h1>
      <p class="text-muted">Sign in to your Spiko account</p>

      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-input" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-input" placeholder="••••••••" required />
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <button type="submit" class="btn btn-primary btn-full" :disabled="auth.loading">
          {{ auth.loading ? 'Signing in…' : 'Sign In' }}
        </button>
      </form>

      <div class="auth-links">
        <RouterLink to="/forgot-password">Forgot password?</RouterLink>
        <span>·</span>
        <RouterLink to="/register">Create account</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const form = ref({ email: '', password: '' });
const error = ref('');

async function handleLogin() {
  error.value = '';
  try {
    await auth.login(form.value.email, form.value.password);
    router.push((route.query.redirect as string) || '/dashboard');
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Login failed';
  }
}
</script>

<style scoped>
.auth-page { min-height: 80vh; display: grid; place-items: center; padding: 2rem; }
.auth-card { width: 100%; max-width: 420px; }
.auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
.auth-form { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; }
.btn-full { width: 100%; justify-content: center; }
.auth-links { display: flex; justify-content: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-muted); }
.auth-links a { color: var(--primary); }
</style>
