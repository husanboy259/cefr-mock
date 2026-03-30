<template>
  <div class="container" style="max-width:500px; padding:2rem 1.5rem">
    <h1 style="font-size:1.5rem; font-weight:700; margin-bottom:1.5rem">Settings</h1>

    <div class="card" style="margin-bottom:1rem">
      <h3 style="margin-bottom:1rem">Change Password</h3>
      <form class="form-col" @submit.prevent="changePassword">
        <div class="form-group">
          <label class="form-label">Current Password</label>
          <input v-model="pw.current" type="password" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">New Password</label>
          <input v-model="pw.next" type="password" class="form-input" minlength="8" />
        </div>
        <p v-if="pwMsg" :class="pwOk ? 'success-msg' : 'form-error'">{{ pwMsg }}</p>
        <button type="submit" class="btn btn-primary">Update Password</button>
      </form>
    </div>

    <div class="card danger-zone">
      <h3>Danger Zone</h3>
      <p class="text-muted" style="margin:.5rem 0">Deleting your account is permanent and cannot be undone.</p>
      <button class="btn btn-danger btn-sm" @click="deleteAccount">Delete Account</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import api from '@/services/api.service';

const auth = useAuthStore(); const router = useRouter();
const pw = ref({ current: '', next: '' });
const pwMsg = ref(''); const pwOk = ref(false);

async function changePassword() {
  try {
    await api.patch('/users/password', { current_password: pw.value.current, new_password: pw.value.next });
    pwMsg.value = 'Password updated!'; pwOk.value = true;
  } catch (e: any) { pwMsg.value = e.response?.data?.error || 'Failed'; pwOk.value = false; }
}

async function deleteAccount() {
  if (!confirm('Are you sure? This cannot be undone.')) return;
  await api.delete('/users/account');
  await auth.logout();
  router.push('/');
}
</script>

<style scoped>
.form-col { display: flex; flex-direction: column; gap: 1rem; }
.success-msg { color: var(--success); font-weight: 500; }
.danger-zone { border: 1.5px solid var(--danger); }
.danger-zone h3 { color: var(--danger); }
</style>
