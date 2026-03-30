<template>
  <div class="container" style="padding:2rem 1.5rem" v-if="data">
    <h1 style="font-size:1.75rem; font-weight:700; margin-bottom:1.5rem">
      Hello, {{ auth.user?.username }} 👋
    </h1>

    <!-- Stats row -->
    <div class="grid-4" style="margin-bottom:2rem">
      <div class="stat-card card">
        <div class="stat-num">{{ data.stats.exercises_completed }}</div>
        <div class="stat-label">Completed</div>
      </div>
      <div class="stat-card card">
        <div class="stat-num">{{ data.stats.avg_quiz_score ?? '—' }}%</div>
        <div class="stat-label">Avg Score</div>
      </div>
      <div class="stat-card card">
        <div class="stat-num">{{ data.streak.current_streak }}</div>
        <div class="stat-label">Day Streak 🔥</div>
      </div>
      <div class="stat-card card">
        <div class="stat-num">{{ data.stats.writing_submitted }}</div>
        <div class="stat-label">Writings Sent</div>
      </div>
    </div>

    <!-- Recent activity -->
    <h2 style="font-size:1.25rem; font-weight:600; margin-bottom:1rem">Recent Activity</h2>
    <div v-if="!data.recentActivity.length" class="text-muted">No activity yet. Start an exercise!</div>
    <div v-else class="activity-list">
      <div v-for="item in data.recentActivity" :key="item.date + item.title" class="activity-item card">
        <span class="badge" :class="`badge-${item.type}`">{{ item.type }}</span>
        <span class="activity-title">{{ item.title }}</span>
        <span v-if="item.score" class="activity-score">{{ Math.round(item.score) }}%</span>
        <span class="text-muted" style="font-size:.8rem">{{ formatDate(item.date) }}</span>
      </div>
    </div>

    <RouterLink to="/exercises" class="btn btn-primary" style="margin-top:2rem">Browse Exercises</RouterLink>
  </div>
  <div v-else class="loading-text">Loading…</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import api from '@/services/api.service';

const auth = useAuthStore();
const data = ref<any>(null);

onMounted(async () => {
  const { data: d } = await api.get('/progress/dashboard');
  data.value = d;
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
</script>

<style scoped>
.stat-card { text-align: center; }
.stat-num  { font-size: 2rem; font-weight: 800; color: var(--primary); }
.stat-label { font-size: .875rem; color: var(--text-muted); margin-top: .25rem; }
.activity-list { display: flex; flex-direction: column; gap: .75rem; }
.activity-item { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
.activity-title { flex: 1; font-weight: 500; }
.activity-score { font-weight: 700; }
.loading-text { text-align: center; padding: 5rem; }
</style>
