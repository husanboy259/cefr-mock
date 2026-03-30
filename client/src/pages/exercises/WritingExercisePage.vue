<template>
  <div class="container" style="max-width:800px; padding:2rem 1.5rem" v-if="content">
    <div class="badge badge-writing" style="margin-bottom:.75rem">Writing</div>
    <h1>{{ content.title }}</h1>

    <div class="prompt card" style="margin:1.25rem 0">
      <h3>Task</h3>
      <p style="margin-top:.5rem; line-height:1.7">{{ content.content.task?.prompt }}</p>
      <p class="text-muted" style="margin-top:.75rem; font-size:.875rem">
        {{ content.content.task?.min_words }}–{{ content.content.task?.max_words }} words
      </p>
    </div>

    <textarea
      v-model="body"
      class="form-input writing-area"
      placeholder="Write your response here…"
      :minlength="content.content.task?.min_words"
    />

    <div class="writing-footer">
      <span class="word-count" :class="{ danger: wordCount > (content.content.task?.max_words ?? 500) }">
        {{ wordCount }} / {{ content.content.task?.max_words }} words
      </span>
      <button class="btn btn-primary" :disabled="submitting || wordCount < (content.content.task?.min_words ?? 50)"
              @click="handleSubmit">
        {{ submitting ? 'Submitting…' : 'Submit Writing' }}
      </button>
    </div>
    <p v-if="error" class="form-error">{{ error }}</p>
  </div>
  <div v-else class="loading-text">Loading…</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExercisesStore } from '@/stores/exercises.store';
import api from '@/services/api.service';

const route = useRoute(); const router = useRouter();
const exStore = useExercisesStore();
const content = ref<any>(null);
const body = ref('');
const submitting = ref(false);
const error = ref('');

const wordCount = computed(() => body.value.trim().split(/\s+/).filter(Boolean).length);

onMounted(async () => { content.value = await exStore.fetchContent(route.params.id as string); });

async function handleSubmit() {
  submitting.value = true; error.value = '';
  try {
    const { data } = await api.post('/writing/submit', {
      exercise_id: content.value.id,
      task_id: content.value.content.task.id,
      body: body.value,
    });
    router.push(`/results/writing/${data.id}`);
  } catch (e: any) {
    error.value = e.response?.data?.error || 'Submission failed';
    submitting.value = false;
  }
}
</script>

<style scoped>
.writing-area {
  width: 100%; min-height: 300px; resize: vertical; font-size: 1rem;
  line-height: 1.7; padding: 1rem;
}
.writing-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; }
.word-count { font-size: 0.875rem; font-weight: 600; color: var(--text-muted); }
.word-count.danger { color: var(--danger); }
.loading-text { text-align: center; padding: 5rem; }
</style>
