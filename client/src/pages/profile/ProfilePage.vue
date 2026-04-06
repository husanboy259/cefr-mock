<template>
  <div class="profile-page" v-if="auth.user">
    <div class="avatar-section">
      <img v-if="auth.user.avatar_url" :src="auth.user.avatar_url" class="avatar-img" />
      <div v-else class="avatar-placeholder">{{ initials }}</div>
      <h2 class="full-name">{{ auth.user.full_name || auth.user.username }}</h2>
      <p class="username">@{{ auth.user.telegram_username || auth.user.username }}</p>
    </div>

    <div class="section-title">ACCOUNT INFO</div>
    <div class="card">
      <div class="info-row" v-if="auth.user.telegram_id">
        <div class="info-icon">👤</div>
        <div>
          <div class="info-label">Telegram ID</div>
          <div class="info-value">{{ auth.user.telegram_id }}</div>
        </div>
      </div>
      <div class="info-row" v-if="auth.user.language_code">
        <div class="info-icon">🌐</div>
        <div>
          <div class="info-label">Language</div>
          <div class="info-value">{{ auth.user.language_code?.toUpperCase() }}</div>
        </div>
      </div>
      <div class="info-row" v-if="!auth.user.telegram_id">
        <div class="info-icon">✉️</div>
        <div>
          <div class="info-label">Email</div>
          <div class="info-value">{{ auth.user.email }}</div>
        </div>
      </div>
    </div>

    <button class="btn btn-outline logout-btn" @click="auth.logout(); $router.push('/')">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
const auth = useAuthStore();
const initials = computed(() => (auth.user?.full_name || auth.user?.username || '?')[0].toUpperCase());
</script>

<style scoped>
.profile-page { max-width: 480px; margin: 0 auto; padding: 2rem 1.5rem; }
.avatar-section { text-align: center; margin-bottom: 2rem; }
.avatar-img { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; }
.avatar-placeholder {
  width: 90px; height: 90px; border-radius: 50%; background: var(--primary);
  color: #fff; font-size: 2rem; font-weight: 800;
  display: grid; place-items: center; margin: 0 auto;
}
.full-name { margin: .75rem 0 .25rem; font-size: 1.3rem; }
.username { color: var(--text-muted); margin: 0; }
.section-title { font-size: .75rem; font-weight: 700; color: var(--text-muted); letter-spacing: .08em; margin: 1.5rem 0 .5rem; }
.card { border-radius: 12px; background: var(--surface); overflow: hidden; }
.info-row { display: flex; align-items: center; gap: 1rem; padding: .9rem 1rem; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
.info-icon { font-size: 1.2rem; width: 36px; height: 36px; background: var(--bg); border-radius: 10px; display: grid; place-items: center; }
.info-label { font-size: .75rem; color: var(--text-muted); }
.info-value { font-weight: 600; }
.logout-btn { width: 100%; margin-top: 1.5rem; }
</style>
