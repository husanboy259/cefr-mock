import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api.service';

export const useQuizStore = defineStore('quiz', () => {
  const attempt = ref<any>(null);
  const loading = ref(false);

  async function start(exerciseId: string) {
    loading.value = true;
    try {
      const { data } = await api.post('/quiz/start', { exercise_id: exerciseId });
      attempt.value = data;
      return data;
    } finally { loading.value = false; }
  }

  async function answer(attemptId: string, questionId: string, optionId?: string, textAnswer?: string) {
    const { data } = await api.post(`/quiz/${attemptId}/answer`, {
      question_id: questionId, option_id: optionId, text_answer: textAnswer,
    });
    return data;
  }

  async function submit(attemptId: string) {
    const { data } = await api.post(`/quiz/${attemptId}/submit`);
    attempt.value = null;
    return data;
  }

  async function getResult(attemptId: string) {
    const { data } = await api.get(`/quiz/${attemptId}/result`);
    return data;
  }

  return { attempt, loading, start, answer, submit, getResult };
});
