import Vue from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import dayjs from 'dayjs';
import Paginate from 'vuejs-paginate';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('paginate', Paginate);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
/* eslint-disable */
import CurrencyFilter from './filters/currency';
Vue.filter('CurrencyFilter', CurrencyFilter);
/* eslint-enable */
const taiwanDate = (date, format = 'YYYY/MM/DD HH:mm') => (
  date ? dayjs(date).format(format) : '');
Vue.prototype.$taiwanDate = taiwanDate;


new Vue({
  render: h => h(App),
}).$mount('#app');
