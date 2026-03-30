<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-text">
          <h1 class="hero-title">Practice English.<br>Pass Your Exam.</h1>
          <p class="hero-sub">
            Free exercises for Reading, Listening, Writing and Speaking.
            Covers all CEFR levels from A1 to C2.
          </p>
          <div class="hero-actions">
            <RouterLink to="/exercises" class="btn btn-primary btn-lg">Browse Exercises</RouterLink>
            <RouterLink v-if="!auth.isLoggedIn" to="/register" class="btn btn-outline btn-lg">Create Free Account</RouterLink>
          </div>
        </div>
        <div class="hero-stats">
          <div class="stat-card"><div class="stat-num">4</div><div>Skill Areas</div></div>
          <div class="stat-card"><div class="stat-num">6</div><div>CEFR Levels</div></div>
          <div class="stat-card"><div class="stat-num">100%</div><div>Free</div></div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="skills container">
      <h2 class="section-title">Practice Every Skill</h2>
      <div class="grid-4">
        <div v-for="skill in skills" :key="skill.type" class="skill-card" @click="$router.push(`/exercises?type=${skill.type}`)">
          <div class="skill-icon">{{ skill.icon }}</div>
          <h3>{{ skill.label }}</h3>
          <p>{{ skill.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Levels -->
    <section class="levels container">
      <h2 class="section-title">All CEFR Levels</h2>
      <div class="levels-grid">
        <div v-for="lvl in levels" :key="lvl.code"
             class="level-chip badge"
             :class="`badge-${lvl.code.toLowerCase()}`"
             @click="$router.push(`/exercises?level=${lvl.code}`)">
          {{ lvl.code }} — {{ lvl.label }}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section v-if="!auth.isLoggedIn" class="cta container">
      <div class="cta-box card text-center">
        <h2>Start Practicing Today — It's Free</h2>
        <p class="text-muted mt-2">No subscription. No credit card. Just practice.</p>
        <RouterLink to="/register" class="btn btn-primary btn-lg mt-4">Get Started</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();

const skills = [
  { type: 'reading',   icon: '📖', label: 'Reading',   desc: 'Comprehension passages with MCQ questions' },
  { type: 'listening', icon: '🎧', label: 'Listening',  desc: 'Audio tracks with comprehension questions' },
  { type: 'writing',   icon: '✍️', label: 'Writing',    desc: 'Structured tasks with rubric feedback' },
  { type: 'speaking',  icon: '🎤', label: 'Speaking',   desc: 'Record your response and get scored' },
];

const levels = [
  { code: 'A1', label: 'Beginner' },
  { code: 'A2', label: 'Elementary' },
  { code: 'B1', label: 'Intermediate' },
  { code: 'B2', label: 'Upper Intermediate' },
  { code: 'C1', label: 'Advanced' },
  { code: 'C2', label: 'Proficiency' },
];
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: #fff; padding: 5rem 0 4rem;
}
.hero-inner { display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
.hero-title { font-size: 2.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; }
.hero-sub { font-size: 1.1rem; opacity: 0.9; margin-bottom: 2rem; max-width: 480px; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-actions .btn-outline { border-color: #fff; color: #fff; }
.hero-actions .btn-outline:hover { background: #fff; color: var(--primary); }
.hero-stats { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.stat-card {
  background: rgba(255,255,255,0.15); border-radius: var(--radius-lg);
  padding: 1.5rem 2rem; text-align: center; backdrop-filter: blur(4px);
}
.stat-num { font-size: 2rem; font-weight: 800; }

.skills { padding: 4rem 0; }
.section-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 2rem; text-align: center; }
.skill-card {
  padding: 1.75rem; background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); text-align: center; cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.skill-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.skill-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
.skill-card h3 { font-size: 1.1rem; margin-bottom: 0.4rem; }
.skill-card p { font-size: 0.875rem; color: var(--text-muted); }

.levels { padding: 0 0 4rem; }
.levels-grid { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
.level-chip { font-size: 0.9rem; padding: 0.5rem 1.25rem; cursor: pointer; transition: transform 0.1s; }
.level-chip:hover { transform: scale(1.05); }

.cta { padding: 0 0 5rem; }
.cta-box { max-width: 600px; margin: 0 auto; padding: 3rem; }
.cta-box h2 { font-size: 1.5rem; }
</style>
