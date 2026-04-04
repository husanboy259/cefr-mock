import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';
import { useAuthStore } from './stores/auth.store';
import api from './services/api.service';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

// Telegram Mini App auto login
const tg = (window as any).Telegram?.WebApp;
if (tg?.initData) {
  tg.ready();
  tg.expand();
  const authStore = useAuthStore();
  api.post('/auth/telegram', { initData: tg.initData }).then(({ data }) => {
    sessionStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    authStore.user = data.user;
    router.push('/exercises');
  }).catch(() => {});
}
