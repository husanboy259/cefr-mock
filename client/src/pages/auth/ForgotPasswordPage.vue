<template>
  <div class="auth-page">
    <div class="auth-card card">
      <h1 class="auth-title">Reset Password</h1>
      <p class="text-muted">Enter your email to receive a reset link</p>
      <form class="auth-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-input" required />
        </div>
        <p v-if="sent" class="success-msg">Check your inbox for a reset link.</p>
        <button type="submit" class="btn btn-primary btn-full">Send Reset Link</button>
      </form>
      <div class="auth-links"><RouterLink to="/login">Back to login</RouterLink></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const email = ref('');
const sent = ref(false);
async function handleSubmit() { sent.value = true; }
</script>

<style scoped>
.auth-page { min-height: 80vh; display: grid; place-items: center; padding: 2rem; }
.auth-card { width: 100%; max-width: 420px; }
.auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
.auth-form { display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0; }
.btn-full { width: 100%; justify-content: center; }
.success-msg { color: var(--success); font-weight: 500; }
.auth-links { text-align: center; font-size: 0.875rem; }
.auth-links a { color: var(--primary); }
</style>
