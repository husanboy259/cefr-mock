<template>
  <div class="home-page">
    <!-- Logo & Title -->
    <div class="app-header">
      <div class="app-logo">C</div>
      <h1 class="app-name">CEFR Pro</h1>
      <p class="app-sub">Multilevel Exam Preparation</p>
    </div>

    <!-- Main Exam Cards -->
    <div class="section">
      <RouterLink to="/exercises?type=reading" class="exam-card">
        <div class="exam-icon reading-icon">📖</div>
        <div class="exam-info">
          <div class="exam-title">Reading Exam</div>
          <div class="exam-desc">Comprehension passages with MCQ</div>
        </div>
        <div class="exam-time">🕐 ~15 min</div>
      </RouterLink>

      <RouterLink to="/exercises?type=writing" class="exam-card">
        <div class="exam-icon writing-icon">✍️</div>
        <div class="exam-info">
          <div class="exam-title">Writing Exam</div>
          <div class="exam-desc">Essays & tasks with AI grading</div>
        </div>
        <div class="exam-time">🕐 ~60 min</div>
      </RouterLink>
    </div>

    <!-- Quick Practice -->
    <div class="section">
      <div class="section-label">QUICK PRACTICE</div>
      <div class="quick-grid">
        <RouterLink to="/exercises?level=A1" class="quick-card">
          <div class="quick-icon">💬</div>
          <div class="quick-title">Beginner</div>
          <div class="quick-time">A1</div>
        </RouterLink>
        <RouterLink to="/exercises?level=B1" class="quick-card">
          <div class="quick-icon">📝</div>
          <div class="quick-title">Intermediate</div>
          <div class="quick-time">B1</div>
        </RouterLink>
        <RouterLink to="/exercises?level=C1" class="quick-card">
          <div class="quick-icon">🎯</div>
          <div class="quick-title">Advanced</div>
          <div class="quick-time">C1</div>
        </RouterLink>
      </div>
    </div>

    <!-- Bottom Nav -->
    <nav class="bottom-nav">
      <RouterLink to="/" class="nav-item" :class="{ active: $route.path === '/' }">
        <span class="nav-icon">🏠</span>
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }">
        <span class="nav-icon">⊞</span>
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink to="/exercises" class="nav-item" :class="{ active: $route.path === '/exercises' }">
        <span class="nav-icon">✓</span>
        <span>Tests</span>
      </RouterLink>
      <RouterLink to="/profile" class="nav-item" :class="{ active: $route.path === '/profile' }">
        <span class="nav-icon">👤</span>
        <span>Profile</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #FFF5EE;
  padding: 2rem 1.25rem 5rem;
  max-width: 480px;
  margin: 0 auto;
}

.app-header { text-align: center; margin-bottom: 2rem; }
.app-logo {
  width: 72px; height: 72px; border-radius: 20px;
  background: linear-gradient(135deg, #E87C2A, #f5a623);
  color: #fff; font-size: 2rem; font-weight: 800;
  display: grid; place-items: center; margin: 0 auto 1rem;
}
.app-name { font-size: 1.75rem; font-weight: 800; color: #2D1B0E; margin-bottom: .25rem; }
.app-sub { color: #A08060; font-size: .95rem; }

.section { margin-bottom: 1.75rem; }
.section-label {
  font-size: .7rem; font-weight: 700; letter-spacing: .1em;
  color: #A08060; margin-bottom: .75rem;
}

.exam-card {
  display: flex; align-items: center; gap: 1rem;
  background: #fff; border-radius: 16px; padding: 1rem 1.25rem;
  margin-bottom: .75rem; text-decoration: none; color: inherit;
  box-shadow: 0 2px 8px rgba(180,100,40,.08);
}
.exam-icon {
  width: 48px; height: 48px; border-radius: 14px;
  display: grid; place-items: center; font-size: 1.4rem; flex-shrink: 0;
}
.reading-icon { background: #FFF0E0; }
.writing-icon { background: #EBF0FF; }
.exam-info { flex: 1; }
.exam-title { font-weight: 700; font-size: 1rem; margin-bottom: .2rem; }
.exam-desc { font-size: .8rem; color: #A08060; }
.exam-time { font-size: .75rem; color: #A08060; white-space: nowrap; }

.quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .75rem; }
.quick-card {
  background: #fff; border-radius: 14px; padding: 1rem .5rem;
  text-align: center; text-decoration: none; color: inherit;
  box-shadow: 0 2px 8px rgba(180,100,40,.08);
}
.quick-icon { font-size: 1.5rem; margin-bottom: .4rem; }
.quick-title { font-size: .8rem; font-weight: 600; margin-bottom: .2rem; }
.quick-time { font-size: .7rem; color: #A08060; }

.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; border-top: 1px solid #F0E0D0;
  display: flex; justify-content: space-around;
  padding: .6rem 0 1rem;
}
.nav-item {
  display: flex; flex-direction: column; align-items: center;
  gap: .2rem; text-decoration: none; color: #A08060;
  font-size: .7rem; font-weight: 500;
}
.nav-item.active { color: #E87C2A; }
.nav-icon { font-size: 1.3rem; }
</style>
