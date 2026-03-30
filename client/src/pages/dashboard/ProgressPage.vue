<template>
  <div class="container" style="padding:2rem 1.5rem">
    <h1 style="font-size:1.75rem; font-weight:700; margin-bottom:1.5rem">My Progress</h1>

    <div v-if="levelStats.length">
      <div v-for="level in ['A1','A2','B1','B2','C1','C2']" :key="level" class="level-section">
        <div class="level-header">
          <span class="badge" :class="`badge-${level.toLowerCase()}`">{{ level }}</span>
        </div>
        <div class="grid-4" style="margin-bottom:1.5rem">
          <div v-for="type in ['reading','listening','writing','speaking']" :key="type" class="type-stat card">
            <div class="type-icon">{{ icons[type] }}</div>
            <div class="type-label">{{ type }}</div>
            <div class="type-count">
              {{ getStat(level, type)?.exercises_done ?? 0 }} done
            </div>
            <div class="progress-bar" style="margin-top:.5rem">
              <div class="progress-bar-fill"
                   :style="{ width: `${Math.min(100, (getStat(level, type)?.exercises_done ?? 0) * 10)}%` }" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-muted text-center" style="padding:3rem">No progress yet — complete some exercises!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api.service';

const levelStats = ref<any[]>([]);
const icons: Record<string, string> = { reading: '📖', listening: '🎧', writing: '✍️', speaking: '🎤' };

onMounted(async () => {
  const { data } = await api.get('/progress/overview');
  levelStats.value = data;
});

function getStat(level: string, type: string) {
  return levelStats.value.find((s) => s.level === level && s.exercise_type === type);
}
</script>

<style scoped>
.level-header { margin-bottom: .75rem; }
.type-stat { text-align: center; padding: 1rem; }
.type-icon { font-size: 1.5rem; }
.type-label { font-size: .8rem; font-weight: 600; text-transform: capitalize; color: var(--text-muted); margin: .25rem 0; }
.type-count { font-size: .875rem; font-weight: 700; }
</style>
