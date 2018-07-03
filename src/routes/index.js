import Vue from 'vue'
import VueRouter from 'vue-router';
import App from '../App.vue';

Vue.use(VueRouter);

function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: App
      }
    ]
  });

  return router;
}

export {
  createRouter
}