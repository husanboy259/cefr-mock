<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <p class="footer-brand">Spiko &mdash; Free English Exam Practice</p>
      <p class="footer-copy">&copy; {{ year }} Spiko. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped>
.app-footer {
  border-top: 1px solid var(--border);
  padding: 1.5rem 0;
  margin-top: 4rem;
  background: #fff;
}
.footer-inner { display: flex; justify-content: space-between; align-items: center; }
.footer-brand { font-weight: 600; }
.footer-copy { color: var(--text-muted); font-size: 0.875rem; }
</style>
