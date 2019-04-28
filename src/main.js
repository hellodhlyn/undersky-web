import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import VueNotification from 'vue-notification';
import marked from 'marked';

import Authenticated from './components/Authenticated.vue';
import IconText from './components/IconText.vue';

import App from './App.vue';
import router from './router';
import store from './store';


function zeroFill(num) {
  return num >= 10 ? num : `0${num}`;
}

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icon', 'ion-item'];

Vue.use(VueLocalStorage);
Vue.use(VueNotification);
Vue.component('icon-text', IconText);
Vue.component('authenticated', Authenticated);

Vue.filter('marked', input => marked(input));
Vue.filter('datetime', (input) => {
  const date = new Date(input);
  return `${date.getFullYear()}-${zeroFill(date.getMonth() + 1)}-${zeroFill(date.getDate())} ${zeroFill(date.getHours())}:${zeroFill(date.getMinutes())}:${zeroFill(date.getSeconds())}`;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
