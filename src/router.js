import Vue from 'vue';
import Router from 'vue-router';

import SignIn from './views/auth/SignIn.vue';
import SignOut from './views/auth/SignOut.vue';

import GameDetail from './views/game/Detail.vue';
import GameIndex from './views/game/Index.vue';
import GameMatch from './views/game/Match.vue';
import GameSubmission from './views/game/Submission.vue';
import GameTry from './views/game/Try.vue';

import Match from './views/Match.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'game-index' },
    },

    {
      path: '/signin',
      name: 'auth-signin',
      component: SignIn,
    },
    {
      path: '/signout',
      name: 'auth-signout',
      component: SignOut,
    },

    {
      path: '/game',
      name: 'game-index',
      component: GameIndex,
    },
    {
      path: '/game/:gameId',
      name: 'game-detail',
      component: GameDetail,
    },
    {
      path: '/game/:gameId/match',
      name: 'game-match',
      component: GameMatch,
    },
    {
      path: '/game/:gameId/submission',
      name: 'game-submission',
      component: GameSubmission,
    },
    {
      path: '/game/:gameId/try',
      name: 'game-try',
      component: GameTry,
    },

    {
      path: '/match',
      name: 'match',
      component: Match,
    },
  ],
});
