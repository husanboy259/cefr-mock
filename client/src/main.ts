import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';
import api from './services/api.service';
import { useAuthStore } from './stores/auth.store';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

// Telegram Mini App auto login
const tg = (window as any).Telegram?.WebApp;
if (tg?.initData) {
  tg.ready();
  tg.expand();
  const tgUser = tg.initDataUnsafe?.user;
  api.post('/auth/telegram', { initData: tg.initData }).then(({ data }) => {
    sessionStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    useAuthStore().user = {
      ...data.user,
      full_name: tgUser ? [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ') : data.user.full_name,
      avatar_url: tgUser?.photo_url ?? null,
      telegram_id: String(tgUser?.id ?? ''),
      telegram_username: tgUser?.username ?? '',
      telegram_photo: tgUser?.photo_url ?? '',
      language_code: tgUser?.language_code ?? '',
    };
    router.push('/exercises');
  }).catch((e: any) => console.error('Telegram auth failed:', e));
}
