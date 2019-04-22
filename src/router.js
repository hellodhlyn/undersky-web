import Vue from 'vue';
import Router from 'vue-router';

import Index from './views/Index.vue';
import SignIn from './views/auth/SignIn.vue';
import GameIndex from './views/game/Index.vue';
import GameSubmission from './views/game/Submission.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/signin',
      name: 'auth-signin',
      component: SignIn,
    },
    {
      path: '/game/:gameId',
      name: 'game-index',
      component: GameIndex,
    },
    {
      path: '/game/:gameId/submission',
      name: 'game-submission',
      component: GameSubmission,
    },
  ],
});
