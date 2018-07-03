import Vue from 'vue';
import { createRouter } from './routes';
import { createStore } from './store';
import App from './App.vue';
import { sync } from 'vuex-router-sync';

/**
 * vue 工厂方法，防止状态交叉
 */
export function createApp() {
  const router = createRouter();
  const store = createStore();

  // 同步 router 状态到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}