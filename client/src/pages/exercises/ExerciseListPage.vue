<template>
  <div class="exercise-list-page container" style="padding-top:2rem; padding-bottom:3rem">
    <h1 class="page-title">Exercises</h1>

    <!-- Filters -->
    <div class="filters">
      <input v-model="filters.search" type="text" class="form-input" placeholder="Search exercises…" style="max-width:280px" />

      <select v-model="filters.type" class="form-input" style="max-width:160px">
        <option value="">All Types</option>
        <option v-for="t in types" :key="t" :value="t">{{ capitalize(t) }}</option>
      </select>

      <select v-model="filters.level" class="form-input" style="max-width:140px">
        <option value="">All Levels</option>
        <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
      </select>

      <button class="btn btn-outline btn-sm" @click="resetFilters">Reset</button>
    </div>

    <!-- Grid -->
    <div v-if="store.loading" class="loading-text">Loading exercises…</div>
    <div v-else-if="!store.exercises.length" class="empty-text">No exercises found.</div>
    <div v-else class="exercises-grid">
      <ExerciseCard v-for="ex in store.exercises" :key="ex.id" :exercise="ex" />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="btn btn-outline btn-sm" :disabled="page === 1" @click="page--">Previous</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button class="btn btn-outline btn-sm" :disabled="page === totalPages" @click="page++">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useExercisesStore } from '@/stores/exercises.store';
import ExerciseCard from '@/components/exercise/ExerciseCard.vue';

const store = useExercisesStore();
const types  = ['reading', 'writing'];
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const page   = ref(1);
const limit  = 20;

const filters = ref({ search: '', type: '', level: '' });

const totalPages = computed(() => Math.ceil(store.total / limit));

function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

function load() {
  store.fetchExercises({ ...filters.value, page: page.value, limit });
}

function resetFilters() {
  filters.value = { search: '', type: '', level: '' };
  page.value = 1;
}

watch([filters, page], load, { deep: true });
onMounted(load);
</script>

<style scoped>
.page-title { font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem; }
.filters { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem; align-items: center; }
.exercises-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
.loading-text, .empty-text { text-align: center; padding: 4rem; color: var(--text-muted); font-size: 1.1rem; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2.5rem; }
</style>
