<template>
  <div class="container" style="max-width:600px; padding:2rem 1.5rem" v-if="auth.user">
    <div class="card text-center" style="margin-bottom:1.5rem">
      <div class="avatar-lg">{{ auth.user.username[0].toUpperCase() }}</div>
      <h1 style="margin:.75rem 0">{{ auth.user.full_name || auth.user.username }}</h1>
      <p class="text-muted">@{{ auth.user.username }}</p>
    </div>
    <div class="card">
      <div class="info-row"><span>Email</span><strong>{{ auth.user.email }}</strong></div>
    </div>
    <RouterLink to="/settings" class="btn btn-outline" style="margin-top:1rem">Edit Settings</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
const auth = useAuthStore();
</script>

<style scoped>
.avatar-lg {
  width: 80px; height: 80px; border-radius: 50%; background: var(--primary); color: #fff;
  display: grid; place-items: center; font-size: 2rem; font-weight: 800; margin: 0 auto;
}
.info-row { display: flex; justify-content: space-between; padding: .5rem 0; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
</style>
