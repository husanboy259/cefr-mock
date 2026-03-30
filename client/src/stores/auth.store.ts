import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api.service';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  isAdmin: boolean;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const loading = ref(false);

  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.isAdmin ?? false);

  async function register(payload: { username: string; email: string; password: string; full_name?: string }) {
    loading.value = true;
    try {
      const { data } = await api.post('/auth/register', payload);
      sessionStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      user.value = data.user;
    } finally {
      loading.value = false;
    }
  }

  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const { data } = await api.post('/auth/login', { email, password });
      sessionStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      user.value = data.user;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) await api.post('/auth/logout', { refreshToken }).catch(() => {});
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    user.value = null;
  }

  async function fetchMe() {
    const token = sessionStorage.getItem('accessToken') || localStorage.getItem('refreshToken');
    if (!token) return;
    try {
      const { data } = await api.get('/auth/me');
      user.value = data;
    } catch {
      user.value = null;
    }
  }

  return { user, loading, isLoggedIn, isAdmin, register, login, logout, fetchMe };
});
