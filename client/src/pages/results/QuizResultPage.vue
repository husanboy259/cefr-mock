<template>
  <div class="container" style="max-width:720px; padding:2rem 1.5rem" v-if="result">
    <div class="result-hero card text-center">
      <div class="score-ring" :class="scoreClass">{{ result.percentage }}%</div>
      <h1>{{ result.percentage >= 70 ? '🎉 Well done!' : '📚 Keep practicing!' }}</h1>
      <p class="text-muted">Score: {{ result.score }} / {{ result.max_score }} points</p>
      <p class="text-muted">Time: {{ formatTime(result.time_taken_sec) }}</p>
    </div>

    <h2 style="margin:2rem 0 1rem">Answer Review</h2>
    <div v-for="(ans, idx) in result.answers" :key="ans.question_id" class="answer-item card"
         :class="ans.is_correct ? 'correct' : 'wrong'">
      <div class="answer-header">
        <span class="q-num">Q{{ idx + 1 }}</span>
        <span class="verdict">{{ ans.is_correct ? '✓ Correct' : '✕ Incorrect' }}</span>
      </div>
      <p class="q-text">{{ ans.question_text }}</p>
      <p v-if="!ans.is_correct" class="answer-detail">
        Your answer: <strong>{{ ans.selected_text || '(no answer)' }}</strong><br/>
        Correct answer: <strong>{{ ans.correct_text }}</strong>
      </p>
      <p v-if="ans.explanation" class="explanation text-muted">{{ ans.explanation }}</p>
    </div>

    <div style="display:flex; gap:1rem; margin-top:2rem">
      <RouterLink to="/exercises" class="btn btn-outline">More Exercises</RouterLink>
      <RouterLink to="/dashboard" class="btn btn-primary">Dashboard</RouterLink>
    </div>
  </div>
  <div v-else class="loading-text">Loading results…</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuizStore } from '@/stores/quiz.store';

const route = useRoute(); const quizStore = useQuizStore();
const result = ref<any>(null);

onMounted(async () => { result.value = await quizStore.getResult(route.params.id as string); });

const scoreClass = computed(() => {
  if (!result.value) return '';
  return result.value.percentage >= 70 ? 'score-pass' : 'score-fail';
});

function formatTime(sec: number) {
  if (!sec) return '—';
  return `${Math.floor(sec / 60)}m ${sec % 60}s`;
}
</script>

<style scoped>
.result-hero { margin-bottom: 0.5rem; }
.score-ring {
  width: 100px; height: 100px; border-radius: 50%; border: 6px solid;
  display: grid; place-items: center; font-size: 1.5rem; font-weight: 800;
  margin: 0 auto 1rem;
}
.score-pass { border-color: var(--success); color: var(--success); }
.score-fail { border-color: var(--danger); color: var(--danger); }
.answer-item { margin-bottom: 1rem; }
.answer-item.correct { border-left: 4px solid var(--success); }
.answer-item.wrong { border-left: 4px solid var(--danger); }
.answer-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
.q-num { font-size: .8rem; font-weight: 700; color: var(--text-muted); }
.verdict { font-size: .875rem; font-weight: 600; }
.answer-item.correct .verdict { color: var(--success); }
.answer-item.wrong .verdict { color: var(--danger); }
.q-text { font-weight: 600; margin-bottom: 0.4rem; }
.answer-detail { font-size: .875rem; margin-bottom: .4rem; }
.explanation { font-size: .85rem; font-style: italic; }
.loading-text { text-align: center; padding: 5rem; }
</style>
