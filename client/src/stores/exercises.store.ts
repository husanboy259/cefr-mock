import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api.service';

export const useExercisesStore = defineStore('exercises', () => {
  const exercises = ref<any[]>([]);
  const total = ref(0);
  const loading = ref(false);

  async function fetchExercises(params: Record<string, any> = {}) {
    loading.value = true;
    try {
      const { data } = await api.get('/exercises', { params });
      exercises.value = data.data;
      total.value = data.total;
    } finally {
      loading.value = false;
    }
  }

  async function fetchExercise(id: string) {
    const { data } = await api.get(`/exercises/${id}`);
    return data;
  }

  async function fetchContent(id: string) {
    const { data } = await api.get(`/exercises/${id}/content`);
    return data;
  }

  async function toggleBookmark(id: string) {
    const { data } = await api.post(`/exercises/${id}/bookmark`);
    return data;
  }

  async function fetchBookmarks() {
    const { data } = await api.get('/exercises/bookmarked');
    return data;
  }

  return { exercises, total, loading, fetchExercises, fetchExercise, fetchContent, toggleBookmark, fetchBookmarks };
});
