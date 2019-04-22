import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

import IconText from './components/IconText.vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icon'];

Vue.use(VueLocalStorage);
Vue.component('icon-text', IconText);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
