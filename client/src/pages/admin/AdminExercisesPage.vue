<template>
  <div class="container" style="padding:2rem 1.5rem">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem">
      <h1 style="font-size:1.75rem; font-weight:700">Exercises</h1>
      <button class="btn btn-primary" @click="showCreate = true">+ New Exercise</button>
    </div>

    <div v-if="exercises.length" class="exercises-table">
      <div class="table-header">
        <span>Title</span><span>Type</span><span>Level</span><span>Status</span><span>Actions</span>
      </div>
      <div v-for="ex in exercises" :key="ex.id" class="table-row">
        <span class="ex-title-cell">{{ ex.title }}</span>
        <span><span class="badge" :class="`badge-${ex.type}`">{{ ex.type }}</span></span>
        <span><span class="badge" :class="`badge-${ex.level.toLowerCase()}`">{{ ex.level }}</span></span>
        <span>
          <span class="status-dot" :class="ex.is_published ? 'pub' : 'draft'">
            {{ ex.is_published ? 'Published' : 'Draft' }}
          </span>
        </span>
        <span class="actions">
          <button class="btn btn-outline btn-sm" @click="togglePublish(ex)">
            {{ ex.is_published ? 'Unpublish' : 'Publish' }}
          </button>
          <button class="btn btn-danger btn-sm" @click="deleteEx(ex.id)">Delete</button>
        </span>
      </div>
    </div>
    <div v-else class="text-muted text-center" style="padding:3rem">No exercises yet.</div>

    <!-- Simple create form -->
    <div v-if="showCreate" class="modal-overlay" @click.self="showCreate = false">
      <div class="modal-box card">
        <h2 style="margin-bottom:1rem">New Exercise</h2>
        <form class="form-col" @submit.prevent="createEx">
          <div class="form-group">
            <label class="form-label">Title</label>
            <input v-model="form.title" class="form-input" required />
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Type</label>
              <select v-model="form.type" class="form-input" required>
                <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Level</label>
              <select v-model="form.level" class="form-input" required>
                <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Language ID</label>
            <input v-model.number="form.language_id" class="form-input" type="number" value="1" required />
          </div>
          <div style="display:flex; gap:.75rem">
            <button type="button" class="btn btn-outline" @click="showCreate = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api.service';

const exercises = ref<any[]>([]);
const showCreate = ref(false);
const types  = ['reading', 'listening', 'writing', 'speaking'];
const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const form = ref({ title: '', type: 'reading', level: 'B1', language_id: 1 });

onMounted(load);

async function load() {
  const { data } = await api.get('/exercises', { params: { limit: 100 } });
  exercises.value = data.data;
}

async function togglePublish(ex: any) {
  await api.post(`/admin/exercises/${ex.id}/publish`);
  ex.is_published = !ex.is_published;
}

async function deleteEx(id: string) {
  if (!confirm('Delete this exercise?')) return;
  await api.delete(`/admin/exercises/${id}`);
  exercises.value = exercises.value.filter((e) => e.id !== id);
}

async function createEx() {
  await api.post('/admin/exercises', form.value);
  showCreate.value = false;
  await load();
}
</script>

<style scoped>
.exercises-table { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.table-header, .table-row {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  align-items: center; padding: .75rem 1rem; gap: .5rem;
}
.table-header { background: #f8fafc; font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--text-muted); }
.table-row { border-top: 1px solid var(--border); }
.ex-title-cell { font-weight: 500; }
.status-dot { font-size: .8rem; font-weight: 600; }
.status-dot.pub { color: var(--success); }
.status-dot.draft { color: var(--text-muted); }
.actions { display: flex; gap: .5rem; }
.form-col { display: flex; flex-direction: column; gap: 1rem; }
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); display:grid; place-items:center; z-index:200; }
.modal-box { width: 100%; max-width: 500px; }
</style>
