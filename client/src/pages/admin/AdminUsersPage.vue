<template>
  <div class="container" style="padding:2rem 1.5rem">
    <h1 style="font-size:1.75rem; font-weight:700; margin-bottom:1.5rem">Users</h1>
    <div class="users-table" v-if="users.length">
      <div class="table-header"><span>Username</span><span>Email</span><span>Status</span><span>Joined</span><span>Action</span></div>
      <div v-for="u in users" :key="u.id" class="table-row">
        <span>{{ u.username }}</span>
        <span>{{ u.email }}</span>
        <span :class="u.is_active ? 'active' : 'banned'">{{ u.is_active ? 'Active' : 'Banned' }}</span>
        <span>{{ new Date(u.created_at).toLocaleDateString() }}</span>
        <button class="btn btn-sm" :class="u.is_active ? 'btn-danger' : 'btn-outline'" @click="toggle(u)">
          {{ u.is_active ? 'Ban' : 'Unban' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api.service';

const users = ref<any[]>([]);
onMounted(async () => { const { data } = await api.get('/admin/users'); users.value = data; });

async function toggle(u: any) {
  await api.patch(`/admin/users/${u.id}/toggle`);
  u.is_active = !u.is_active;
}
</script>

<style scoped>
.users-table { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.table-header, .table-row { display: grid; grid-template-columns: 1fr 2fr 1fr 1fr 1fr; align-items: center; padding: .75rem 1rem; gap: .5rem; }
.table-header { background: #f8fafc; font-size: .8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); }
.table-row { border-top: 1px solid var(--border); }
.active { color: var(--success); font-weight: 600; }
.banned { color: var(--danger); font-weight: 600; }
</style>
