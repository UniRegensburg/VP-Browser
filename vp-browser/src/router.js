import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Versuche from './views/Versuche.vue';
import VDetail from './views/VDetail.vue';
import Profil from './views/Profil.vue';
import Sessions from './views/Sessions.vue';
import MeineVersuche from './views/meineVersuche.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/versuche',
      name: 'verusche',
      component: Versuche,
    },
    {
      path: '/vd',
      name: 'vdetail',
      component: VDetail,
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil,
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions,
    },
    {
      path: '/mv',
      name: 'mv',
      component: MeineVersuche,
    },
  ],
});
