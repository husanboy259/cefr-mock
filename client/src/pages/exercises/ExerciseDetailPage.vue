<template>
  <div class="container" style="padding-top:2rem; padding-bottom:3rem; max-width:760px">
    <div v-if="loading" class="loading-text">Loading…</div>
    <template v-else-if="exercise">
      <div class="meta">
        <span class="badge" :class="`badge-${exercise.level.toLowerCase()}`">{{ exercise.level }}</span>
        <span class="badge" :class="`badge-${exercise.type}`">{{ exercise.type }}</span>
        <span v-if="exercise.estimated_minutes" class="text-muted">{{ exercise.estimated_minutes }} min</span>
      </div>
      <h1 style="font-size:1.75rem; font-weight:700; margin:.75rem 0">{{ exercise.title }}</h1>
      <p v-if="exercise.description" class="text-muted" style="margin-bottom:1.5rem">{{ exercise.description }}</p>

      <div v-if="exercise.instructions" class="instructions card">
        <h3>Instructions</h3>
        <p>{{ exercise.instructions }}</p>
      </div>

      <div class="stats card">
        <div><strong>{{ exercise.total_attempts }}</strong> attempts</div>
        <div v-if="exercise.avg_score"><strong>{{ Math.round(exercise.avg_score) }}%</strong> average</div>
        <div v-if="exercise.difficulty"><strong>{{ exercise.difficulty }}</strong> difficulty</div>
      </div>

      <button class="btn btn-primary btn-lg start-btn" @click="startExercise">
        Start Exercise
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExercisesStore } from '@/stores/exercises.store';
import { useAuthStore } from '@/stores/auth.store';

const route = useRoute();
const router = useRouter();
const store = useExercisesStore();
const auth = useAuthStore();

const exercise = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  exercise.value = await store.fetchExercise(route.params.id as string);
  loading.value = false;
});

function startExercise() {
  if (!auth.isLoggedIn) { router.push(`/login?redirect=/exercises/${exercise.value.id}`); return; }
  router.push(`/exercise/${exercise.value.type}/${exercise.value.id}`);
}
</script>

<style scoped>
.meta { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.instructions { margin: 1rem 0; }
.instructions h3 { margin-bottom: 0.5rem; }
.stats { display: flex; gap: 2rem; margin: 1rem 0; font-size: 0.9rem; }
.start-btn { margin-top: 1.5rem; }
.loading-text { text-align: center; padding: 4rem; color: var(--text-muted); }
</style>
