import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/pages/HomePage.vue') },

  // Auth
  { path: '/login',           component: () => import('@/pages/auth/LoginPage.vue'), meta: { guest: true } },
  { path: '/register',        component: () => import('@/pages/auth/RegisterPage.vue'), meta: { guest: true } },
  { path: '/forgot-password', component: () => import('@/pages/auth/ForgotPasswordPage.vue'), meta: { guest: true } },

  // Exercises
  { path: '/exercises',       component: () => import('@/pages/exercises/ExerciseListPage.vue') },
  { path: '/exercises/:id',   component: () => import('@/pages/exercises/ExerciseDetailPage.vue') },
  { path: '/exercise/reading/:id',   component: () => import('@/pages/exercises/ReadingExercisePage.vue'),   meta: { auth: true } },
  { path: '/exercise/writing/:id',   component: () => import('@/pages/exercises/WritingExercisePage.vue'),   meta: { auth: true } },

  // Results
  { path: '/results/quiz/:id',     component: () => import('@/pages/results/QuizResultPage.vue'),     meta: { auth: true } },
  { path: '/results/writing/:id',  component: () => import('@/pages/results/WritingResultPage.vue'),  meta: { auth: true } },

  // Dashboard
  { path: '/dashboard',      component: () => import('@/pages/dashboard/DashboardPage.vue'), meta: { auth: true } },
  { path: '/progress',       component: () => import('@/pages/dashboard/ProgressPage.vue'),  meta: { auth: true } },

  // Profile
  { path: '/profile',   component: () => import('@/pages/profile/ProfilePage.vue'),   meta: { auth: true } },
  { path: '/settings',  component: () => import('@/pages/profile/SettingsPage.vue'),  meta: { auth: true } },

  // Admin
  { path: '/admin',            component: () => import('@/pages/admin/AdminDashboardPage.vue'), meta: { admin: true } },
  { path: '/admin/exercises',  component: () => import('@/pages/admin/AdminExercisesPage.vue'), meta: { admin: true } },
  { path: '/admin/users',      component: () => import('@/pages/admin/AdminUsersPage.vue'),     meta: { admin: true } },
  { path: '/admin/submissions',component: () => import('@/pages/admin/AdminSubmissionsPage.vue'), meta: { admin: true } },

  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // Try to restore session on first load
  if (!auth.user) await auth.fetchMe();

  if (to.meta.admin && !auth.isAdmin)    return '/';
  if (to.meta.auth && !auth.isLoggedIn)  return `/login?redirect=${to.path}`;
  if (to.meta.guest && auth.isLoggedIn)  return '/dashboard';
});

export default router;
