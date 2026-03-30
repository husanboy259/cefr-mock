<template>
  <div class="container" style="padding:2rem 1.5rem" v-if="stats">
    <h1 style="font-size:1.75rem; font-weight:700; margin-bottom:1.5rem">Admin Dashboard</h1>
    <div class="grid-4">
      <div class="card stat-card"><div class="stat-num">{{ stats.total_users }}</div><div>Users</div></div>
      <div class="card stat-card"><div class="stat-num">{{ stats.published_exercises }}</div><div>Published Exercises</div></div>
      <div class="card stat-card warn"><div class="stat-num">{{ stats.writing_pending }}</div><div>Writing Pending</div></div>
      <div class="card stat-card warn"><div class="stat-num">{{ stats.speaking_pending }}</div><div>Speaking Pending</div></div>
    </div>
    <div style="display:flex; gap:1rem; margin-top:2rem; flex-wrap:wrap">
      <RouterLink to="/admin/exercises" class="btn btn-primary">Manage Exercises</RouterLink>
      <RouterLink to="/admin/submissions" class="btn btn-outline">Review Submissions</RouterLink>
      <RouterLink to="/admin/users" class="btn btn-outline">Manage Users</RouterLink>
    </div>
  </div>
  <div v-else class="loading-text">Loading…</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api.service';
const stats = ref<any>(null);
onMounted(async () => { const { data } = await api.get('/admin/stats'); stats.value = data; });
</script>

<style scoped>
.stat-card { text-align: center; }
.stat-num { font-size: 2rem; font-weight: 800; color: var(--primary); }
.stat-card.warn .stat-num { color: var(--warning); }
.loading-text { text-align: center; padding: 5rem; }
</style>
