<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in ui.toasts"
          :key="toast.id"
          class="toast"
          :class="`toast-${toast.type}`"
          @click="ui.removeToast(toast.id)"
        >
          <span class="toast-icon">{{ icons[toast.type] }}</span>
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui.store';

const ui = useUiStore();
const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
</script>

<style scoped>
.toast-container {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  display: flex; flex-direction: column; gap: 0.5rem; z-index: 9999;
}
.toast {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1.25rem; border-radius: var(--radius);
  color: #fff; font-weight: 500; cursor: pointer;
  min-width: 250px; box-shadow: var(--shadow-md);
}
.toast-success { background: #16a34a; }
.toast-error   { background: #dc2626; }
.toast-warning { background: #d97706; }
.toast-info    { background: #2563eb; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s; }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-leave-to   { opacity: 0; transform: translateX(100%); }
</style>
