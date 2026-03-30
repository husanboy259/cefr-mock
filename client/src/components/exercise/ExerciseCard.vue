<template>
  <div class="exercise-card" @click="$router.push(`/exercises/${exercise.id}`)">
    <div class="card-thumb">
      <img v-if="exercise.thumbnail_url" :src="exercise.thumbnail_url" :alt="exercise.title" />
      <div v-else class="thumb-placeholder" :class="`thumb-${exercise.type}`">
        {{ typeIcons[exercise.type] }}
      </div>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="badge" :class="`badge-${exercise.level.toLowerCase()}`">{{ exercise.level }}</span>
        <span class="badge" :class="`badge-${exercise.type}`">{{ exercise.type }}</span>
        <span v-if="exercise.estimated_minutes" class="text-muted" style="font-size:.8rem">
          {{ exercise.estimated_minutes }} min
        </span>
      </div>
      <h3 class="card-title">{{ exercise.title }}</h3>
      <p v-if="exercise.description" class="card-desc">{{ exercise.description }}</p>
      <div class="card-footer">
        <span v-if="exercise.avg_score" class="score">
          ★ {{ Math.round(exercise.avg_score) }}%
        </span>
        <span class="attempts">{{ exercise.total_attempts }} attempts</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ exercise: any }>();
const typeIcons: Record<string, string> = {
  reading: '📖', listening: '🎧', writing: '✍️', speaking: '🎤',
};
</script>

<style scoped>
.exercise-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
  cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;
}
.exercise-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.card-thumb { height: 140px; overflow: hidden; background: #f1f5f9; }
.card-thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb-placeholder {
  width: 100%; height: 100%; display: grid; place-items: center; font-size: 2.5rem;
}
.thumb-reading   { background: #dbeafe; }
.thumb-listening { background: #fce7f3; }
.thumb-writing   { background: #dcfce7; }
.thumb-speaking  { background: #fef3c7; }
.card-body { padding: 1rem; }
.card-meta { display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; }
.card-title { font-size: 0.975rem; font-weight: 600; margin-bottom: 0.35rem; line-height: 1.3; }
.card-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-footer { display: flex; justify-content: space-between; margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-muted); }
.score { color: #f59e0b; font-weight: 600; }
</style>
