<template>
  <div id="app-wrapper">
    <AppHeader v-if="!isAdminRoute" />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter v-if="!isAdminRoute && !isExerciseRoute" />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';
import AppToast from '@/components/common/AppToast.vue';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
const isExerciseRoute = computed(() => route.path.includes('/exercise/'));
</script>
