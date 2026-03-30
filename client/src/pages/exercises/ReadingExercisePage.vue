<template>
  <div class="exercise-page" v-if="content">
    <div class="exercise-header">
      <span class="badge" :class="`badge-${content.level?.toLowerCase()}`">{{ content.level }}</span>
      <span class="ex-title">{{ content.title }}</span>
      <div class="timer" :class="{ urgent: timeLeft < 60 }">⏱ {{ formatTime(timeLeft) }}</div>
    </div>

    <div class="exercise-body container">
      <!-- Left: Passage -->
      <div class="passage-panel">
        <div v-for="p in content.content.passages" :key="p.id" class="passage">
          <div class="passage-text">{{ p.body }}</div>
        </div>
      </div>

      <!-- Right: Questions -->
      <div class="questions-panel">
        <div v-for="(q, idx) in content.content.questions" :key="q.id" class="question-block">
          <p class="question-num">Q{{ idx + 1 }}</p>
          <p class="question-text">{{ q.question_text }}</p>
          <div class="options">
            <label v-for="opt in (q.answer_options ?? q.options ?? [])" :key="opt.id" class="option"
                   :class="{ selected: answers[q.id] === opt.id }">
              <input type="radio" :name="q.id" :value="opt.id" v-model="answers[q.id]" />
              {{ opt.option_text }}
            </label>
          </div>
        </div>

        <button class="btn btn-primary btn-lg submit-btn" :disabled="submitting" @click="handleSubmit">
          {{ submitting ? 'Submitting…' : 'Submit Answers' }}
        </button>
      </div>
    </div>
  </div>
  <div v-else class="loading-text">Loading exercise…</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExercisesStore } from '@/stores/exercises.store';
import { useQuizStore } from '@/stores/quiz.store';

const route  = useRoute();
const router = useRouter();
const exStore  = useExercisesStore();
const quizStore = useQuizStore();

const content  = ref<any>(null);
const attempt  = ref<any>(null);
const answers  = ref<Record<string, string>>({});
const timeLeft = ref(0);
const submitting = ref(false);
let timer: ReturnType<typeof setInterval>;

onMounted(async () => {
  const id = route.params.id as string;
  content.value = await exStore.fetchContent(id);
  attempt.value = await quizStore.start(id);
  timeLeft.value = (content.value.estimated_minutes ?? 20) * 60;
  timer = setInterval(() => { if (timeLeft.value > 0) timeLeft.value--; else handleSubmit(); }, 1000);
});

onUnmounted(() => clearInterval(timer));

function formatTime(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

async function handleSubmit() {
  if (submitting.value) return;
  submitting.value = true;
  clearInterval(timer);
  // Submit all answers
  const qs = content.value.content.questions as any[];
  for (const q of qs) {
    if (answers.value[q.id]) {
      await quizStore.answer(attempt.value.id, q.id, answers.value[q.id]);
    }
  }
  const result = await quizStore.submit(attempt.value.id);
  router.push(`/results/quiz/${result.id}`);
}
</script>

<style scoped>
.exercise-page { min-height: 100vh; display: flex; flex-direction: column; }
.exercise-header {
  background: var(--surface); border-bottom: 1px solid var(--border);
  padding: 0.75rem 1.5rem; display: flex; align-items: center; gap: 1rem; position: sticky; top: 64px; z-index: 10;
}
.ex-title { flex: 1; font-weight: 600; }
.timer { font-weight: 700; font-size: 1.1rem; }
.timer.urgent { color: var(--danger); }
.exercise-body { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding-top: 1.5rem; padding-bottom: 3rem; }
.passage { margin-bottom: 1.5rem; }
.passage-text { line-height: 1.8; white-space: pre-line; }
.question-block { margin-bottom: 1.75rem; }
.question-num { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
.question-text { font-weight: 600; margin: 0.25rem 0 0.75rem; }
.options { display: flex; flex-direction: column; gap: 0.5rem; }
.option {
  display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.875rem;
  border: 1.5px solid var(--border); border-radius: var(--radius); cursor: pointer;
  transition: all 0.15s; font-size: 0.9rem;
}
.option.selected { border-color: var(--primary); background: #ede9fe; }
.option input { display: none; }
.submit-btn { width: 100%; justify-content: center; }
.loading-text { text-align: center; padding: 5rem; }
@media (max-width: 768px) {
  .exercise-body { grid-template-columns: 1fr; }
}
</style>
