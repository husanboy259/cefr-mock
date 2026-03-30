import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export const useUiStore = defineStore('ui', () => {
  const toasts = ref<Toast[]>([]);
  let nextId = 1;

  function addToast(message: string, type: ToastType = 'info', duration = 3500) {
    const id = nextId++;
    toasts.value.push({ id, type, message });
    setTimeout(() => removeToast(id), duration);
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  const toast = {
    success: (msg: string) => addToast(msg, 'success'),
    error:   (msg: string) => addToast(msg, 'error', 5000),
    warning: (msg: string) => addToast(msg, 'warning'),
    info:    (msg: string) => addToast(msg, 'info'),
  };

  return { toasts, removeToast, toast };
});
