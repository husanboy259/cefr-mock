<template>
  <div class="container" style="max-width:720px; padding:2rem 1.5rem" v-if="sub">
    <div class="card text-center" style="margin-bottom:1.5rem">
      <div class="status-badge" :class="sub.status">{{ statusLabel }}</div>
      <h1 style="margin:.75rem 0">{{ sub.exercise_title }}</h1>
      <p class="text-muted" v-if="sub.score">Score: {{ sub.score }} / {{ sub.max_score }}</p>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <h3>Your Writing ({{ sub.word_count }} words)</h3>
      <p style="margin-top:.75rem; line-height:1.8; white-space:pre-line">{{ sub.body }}</p>
    </div>

    <div v-if="sub.feedback" class="card feedback-card" style="margin-bottom:1rem">
      <h3>Feedback</h3>
      <p style="margin-top:.75rem; line-height:1.7">{{ sub.feedback }}</p>
    </div>

    <div v-if="sub.status === 'pending'" class="pending-card card text-center">
      <p>⏳ Your writing is awaiting review. Check back later.</p>
    </div>

    <RouterLink to="/exercises" class="btn btn-outline" style="margin-top:1.5rem">More Exercises</RouterLink>
  </div>
  <div v-else class="loading-text">Loading…</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api.service';

const route = useRoute();
const sub = ref<any>(null);
onMounted(async () => {
  const { data } = await api.get(`/writing/submissions/${route.params.id}`);
  sub.value = data;
});
const statusLabel = computed(() => {
  const map: Record<string, string> = { pending: 'Awaiting Review', graded: 'Graded', manual_review: 'Under Review' };
  return map[sub.value?.status] ?? sub.value?.status;
});
</script>

<style scoped>
.status-badge { display: inline-block; padding: .3rem .9rem; border-radius: 9999px; font-size:.875rem; font-weight:700; }
.status-badge.pending { background:#fef3c7; color:#92400e; }
.status-badge.graded  { background:#dcfce7; color:#166534; }
.feedback-card { border-left: 4px solid var(--primary); }
.loading-text { text-align: center; padding: 5rem; }
</style>
