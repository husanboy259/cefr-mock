<template>
  <div class="container" style="padding:2rem 1.5rem">
    <h1 style="font-size:1.75rem; font-weight:700; margin-bottom:1.5rem">Submissions</h1>

    <div class="tabs">
      <button class="tab-btn" :class="{ active: tab === 'writing' }" @click="tab = 'writing'">Writing</button>
      <button class="tab-btn" :class="{ active: tab === 'speaking' }" @click="tab = 'speaking'">Speaking</button>
    </div>

    <div v-if="!submissions.length" class="text-muted text-center" style="padding:3rem">No pending submissions.</div>
    <div v-else class="sub-list">
      <div v-for="s in submissions" :key="s.id" class="sub-card card">
        <div class="sub-header">
          <strong>{{ s.username }}</strong>
          <span class="text-muted">{{ s.exercise_title }}</span>
          <span class="text-muted" style="font-size:.8rem">{{ new Date(s.submitted_at).toLocaleString() }}</span>
        </div>

        <!-- Writing preview -->
        <template v-if="tab === 'writing'">
          <p class="sub-body">{{ s.body }}</p>
        </template>
        <!-- Speaking audio -->
        <template v-else>
          <audio :src="s.audio_url" controls style="width:100%; margin:.5rem 0" />
        </template>

        <!-- Grading form -->
        <div v-if="grading === s.id" class="grade-form">
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Score</label>
              <input v-model.number="gradeData.score" type="number" class="form-input" min="0" />
            </div>
            <div class="form-group">
              <label class="form-label">Max Score</label>
              <input v-model.number="gradeData.max_score" type="number" class="form-input" min="1" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Feedback</label>
            <textarea v-model="gradeData.feedback" class="form-input" rows="3" />
          </div>
          <div style="display:flex; gap:.75rem">
            <button class="btn btn-outline btn-sm" @click="grading = null">Cancel</button>
            <button class="btn btn-primary btn-sm" @click="submitGrade(s.id)">Save Grade</button>
          </div>
        </div>
        <button v-else class="btn btn-primary btn-sm" @click="openGrade(s.id)" style="align-self:flex-start; margin-top:.5rem">
          Grade
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import api from '@/services/api.service';

const tab = ref<'writing' | 'speaking'>('writing');
const submissions = ref<any[]>([]);
const grading = ref<string | null>(null);
const gradeData = ref({ score: 0, max_score: 100, feedback: '' });

async function load() {
  const { data } = await api.get(`/admin/submissions/${tab.value}`);
  submissions.value = data;
}

function openGrade(id: string) {
  grading.value = id; gradeData.value = { score: 0, max_score: 100, feedback: '' };
}

async function submitGrade(id: string) {
  await api.patch(`/admin/submissions/${tab.value}/${id}`, gradeData.value);
  submissions.value = submissions.value.filter((s) => s.id !== id);
  grading.value = null;
}

watch(tab, load);
onMounted(load);
</script>

<style scoped>
.tabs { display: flex; gap: .5rem; margin-bottom: 1.5rem; }
.tab-btn { padding: .5rem 1.25rem; border: 2px solid var(--border); border-radius: var(--radius); background: none; font-weight: 600; }
.tab-btn.active { border-color: var(--primary); color: var(--primary); }
.sub-list { display: flex; flex-direction: column; gap: 1rem; }
.sub-card { display: flex; flex-direction: column; gap: .5rem; }
.sub-header { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
.sub-body {
  background: #f8fafc; padding: 1rem; border-radius: var(--radius);
  font-size: .9rem; line-height: 1.7; max-height: 200px; overflow-y: auto;
  white-space: pre-wrap;
}
.grade-form { background: #f8fafc; padding: 1rem; border-radius: var(--radius); display: flex; flex-direction: column; gap: .75rem; }
</style>
