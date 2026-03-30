<template>
  <header class="app-header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">S</span>
        <span class="logo-text">Spiko</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/exercises" class="nav-link">Exercises</RouterLink>
        <RouterLink v-if="auth.isLoggedIn" to="/dashboard" class="nav-link">Dashboard</RouterLink>
        <RouterLink v-if="auth.isAdmin" to="/admin" class="nav-link nav-admin">Admin</RouterLink>
      </nav>

      <div class="header-actions">
        <template v-if="auth.isLoggedIn">
          <RouterLink to="/profile" class="avatar-btn">
            <span class="avatar">{{ auth.user?.username[0].toUpperCase() }}</span>
          </RouterLink>
          <button class="btn btn-outline btn-sm" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn-outline btn-sm">Login</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-sm">Sign Up</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

async function handleLogout() {
  await auth.logout();
  router.push('/');
}
</script>

<style scoped>
.app-header {
  position: sticky; top: 0; z-index: 100;
  background: #fff; border-bottom: 1px solid var(--border);
  height: 64px;
}
.header-inner {
  display: flex; align-items: center; justify-content: space-between; height: 100%;
}
.logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 1.25rem; }
.logo-icon {
  width: 32px; height: 32px; background: var(--primary); color: #fff;
  border-radius: 8px; display: grid; place-items: center; font-size: 1rem;
}
.nav { display: flex; gap: 1.5rem; }
.nav-link { font-weight: 500; color: var(--text-muted); transition: color 0.15s; }
.nav-link:hover, .nav-link.router-link-active { color: var(--primary); }
.nav-admin { color: var(--warning) !important; }
.header-actions { display: flex; align-items: center; gap: 0.75rem; }
.avatar-btn { display: flex; }
.avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--primary); color: #fff;
  display: grid; place-items: center; font-weight: 700;
}
</style>
