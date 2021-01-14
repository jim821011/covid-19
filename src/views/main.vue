<template>
  <div>
    <a href="#" class="go-top" @click.prevent="goTop" title="回到頂端">
      <i class="fas fa-arrow-up"></i>
    </a>
    <a href="#" class="reload-icon" @click.prevent="reload" title="更新資料">
      <i class="fas fa-sync-alt"></i>
    </a>
    <nav class="board-navbar py-1">
      <div class="container">
        <h1 class="board-title">COVID-19 全球觀測站</h1>
      </div>
    </nav>
    <main class="board-content">
      <div class="container">
        <div class="mt-4">
          <h2 class="m-0 font-weight-bolder">死亡數累計圖表</h2>
        </div>
        <div class="row mt-4">
          <div class="col">
            <apexchart width="100%" height="400" type="bar"
              :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>

        <div class="mt-4 d-flex flex-column">
          <h2 class="m-0 font-weight-bolder">世界即時資訊</h2>
          <span class="text-right text-secondary mt-2">更新時間 : {{ transforDate }}</span>
        </div>
        <section class="row mt-4 font-weight-bolder">
          <div class="col-md-6 col-lg-4">
            <div class="board-card mb-3 p-3">
              <h3 class="board-card-title">NewConfirmed</h3>
              <p class="mb-2">
                新增確診
                <span v-if="!covidData.length"
                  class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-else class="text-danger">
                  {{ covidGlobalData.NewConfirmed | CurrencyFilter }}
                </span> 人
              </p>
              <span class="text-right d-block board-card-footer">最新更新日確診人數</span>
              <div class="virus-icon">
                <i class="fas fa-virus fa-2x"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="board-card mb-3 p-3">
              <h3 class="board-card-title">TotalConfirmed</h3>
              <p class="mb-2">
                累計確診
                <span v-if="!covidData.length"
                  class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-else class="text-danger">
                  {{ covidGlobalData.TotalConfirmed | CurrencyFilter }}
                </span> 人
              </p>
              <span class="text-right d-block board-card-footer">總確診人數</span>
              <div class="virus-icon">
                <i class="fas fa-virus fa-2x"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="board-card mb-3 p-3">
              <h3 class="board-card-title">NewDeaths</h3>
              <p class="mb-2">
                新增死亡
                <span v-if="!covidData.length"
                  class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-else class="text-danger">
                  {{ covidGlobalData.NewDeaths | CurrencyFilter }}
                </span> 人
              </p>
              <span class="text-right d-block board-card-footer">最新更新日死亡人數</span>
              <div class="virus-icon">
                <i class="fas fa-virus fa-2x"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="board-card mb-3 p-3">
              <h3 class="board-card-title">TotalDeaths</h3>
              <p class="mb-2">
                累計死亡
                <span v-if="!covidData.length"
                  class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-else class="text-danger">
                  {{ covidGlobalData.TotalDeaths | CurrencyFilter }}
                </span> 人
            </p>
              <span class="text-right d-block board-card-footer">總死亡人數</span>
              <div class="virus-icon">
                <i class="fas fa-virus fa-2x"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="board-card mb-3 p-3">
              <h3 class="board-card-title">NewRecovered</h3>
              <p class="mb-2">
                新增痊癒
                <span v-if="!covidData.length"
                  class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-else class="text-danger">
                  {{ covidGlobalData.NewRecovered | CurrencyFilter }}
                </span> 人
              </p>
              <span class="text-right d-block board-card-footer">最新更新日痊癒人數</span>
              <div class="virus-icon">
                <i class="fas fa-virus fa-2x"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="board-card mb-3 p-3">
              <h3 class="board-card-title">TotalRecovered</h3>
              <p class="mb-2">
                累計痊癒
                <span v-if="!covidData.length"
                  class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </span>
                <span v-else class="text-danger">
                  {{ covidGlobalData.TotalRecovered | CurrencyFilter }}
                </span> 人
              </p>
              <span class="text-right d-block board-card-footer">總痊癒人數</span>
              <div class="virus-icon">
                <i class="fas fa-virus fa-2x"></i>
              </div>
            </div>
          </div>
        </section>

        <div class="mt-4 d-flex flex-column">
          <h2 class="m-0 font-weight-bolder">地區即時資訊</h2>
          <select class="ml-auto mt-2 mt-md-0 board-select" v-model="selection">
            <option value="" selected>依字母排列</option>
            <option value="newConfirmed">新增確診 ( 多至少 )</option>
            <option value="totalConfirmed">累計確診 ( 多至少 )</option>
            <option value="newDeath">新增死亡 ( 多至少 )</option>
            <option value="totalDeath">累計死亡 ( 多至少 )</option>
          </select>
        </div>
        <section class="mt-4">
          <div class="board-card mb-3 p-3"
            v-for="item in covidDataFilter[currentPage]" :key="item.CountryCode">
            <h3 class="board-card-title-2 mb-3">{{ item.Country }} ({{ item.CountryCode }})</h3>
            <div class="attaction-icon">
              <a href="#" class="">
                <i class="fas fa-paperclip fa-2x text-secondary"></i>
              </a>
            </div>
            <div class="board-card-body p-3 p-md-4 text-center">
              <div class="row">
                <div class="col-6 col-md-3 mb-3 mb-md-0">
                  <span class="text-secondary mb-1 d-block">新增確診</span>
                  <div class="board-card-body-item">
                    <i class="fas fa-head-side-mask fa-2x area-icon"></i>
                    <span class="ml-2 text-danger font-weight-bolder">
                      {{ item.NewConfirmed | CurrencyFilter }}
                    </span>
                  </div>
                </div>
                <div class="col-6 col-md-3 mb-3 mb-md-0">
                  <span class="text-secondary mb-1 d-block">新增死亡</span>
                  <div class="board-card-body-item">
                    <i class="fas fa-skull-crossbones fa-2x area-icon"></i>
                    <span class="ml-2 text-danger font-weight-bolder">
                      {{ item.NewDeaths | CurrencyFilter }}
                    </span>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <span class="text-secondary mb-1 d-block">累計確診</span>
                  <div class="board-card-body-item">
                    <i class="fas fa-head-side-mask fa-2x area-icon"></i>
                    <span class="ml-2 text-danger font-weight-bolder">
                      {{ item.TotalConfirmed | CurrencyFilter }}
                    </span>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <span class="text-secondary mb-1 d-block">累計死亡</span>
                  <div class="board-card-body-item">
                    <i class="fas fa-skull-crossbones fa-2x area-icon"></i>
                    <span class="ml-2 text-danger font-weight-bolder">
                      {{ item.TotalDeaths | CurrencyFilter }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <paginate :page-count="covidDataFilter.length"
            :page-range=3
            :margin-pages=1
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-text="'&laquo;'"
            :next-text="'&raquo;'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-link-class="'page-link'"
            :click-handler="pageCallback">
          </paginate>
        </section>

      </div>
    </main>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      covidData: [],
      covidGlobalData: {},
      date: '',
      page: 10,
      currentPage: 0,
      selection: '',
      chartOptions: {
        chart: {
          id: 'covid-19-chart',
          toolbar: {
            show: true,
            tools: {
              download: false,
            },
          },
        },
        xaxis: {
          categories: [],
        },
        colors: ['#ee9ca7'],
        dataLabels: {
          enabled: false,
        },
      },
      series: [{
        name: '死亡數',
        data: [],
      }],
    };
  },
  computed: {
    transforDate() {
      return this.$taiwanDate(this.date);
    },
    covidDataFilter() {
      const vm = this;
      const filterArr = [];
      let sortArr = [];
      switch (vm.selection) {
        case 'newConfirmed':
          sortArr = vm.covidData.sort((a, b) => (b.NewConfirmed > a.NewConfirmed ? 1 : -1));
          break;
        case 'totalConfirmed':
          sortArr = vm.covidData.sort((a, b) => (b.TotalConfirmed > a.TotalConfirmed ? 1 : -1));
          break;
        case 'newDeath':
          sortArr = vm.covidData.sort((a, b) => (b.NewDeaths > a.NewDeaths ? 1 : -1));
          break;
        case 'totalDeath':
          sortArr = vm.covidData.sort((a, b) => (b.TotalDeaths > a.TotalDeaths ? 1 : -1));
          break;
        default:
          sortArr = vm.covidData.sort((a, b) => (a.Country > b.Country ? 1 : -1));
          break;
      }
      sortArr.forEach((item, i) => {
        if (i % vm.page === 0) {
          filterArr.push([]);
        }
        const num = Math.floor(i / vm.page);
        filterArr[num].push(item);
      });
      return filterArr;
    },
  },
  created() {
    this.getData();
    window.addEventListener('scroll', this.goTopShow);
  },
  methods: {
    getData() {
      const vm = this;
      const api = 'https://api.covid19api.com/summary';
      vm.$http.get(api)
        .then((res) => {
          // console.log(res);
          vm.covidData = res.data.Countries;
          vm.covidGlobalData = res.data.Global;
          vm.date = res.data.Date;
          // 取前十死亡數最高的國家
          let deathHeightToLow = [];
          const deathAmount = [];
          const countiesCode = [];
          deathHeightToLow = res.data.Countries
            .sort((a, b) => (b.TotalDeaths > a.TotalDeaths ? 1 : -1))
            .filter((item, i) => (i < 10));
          deathHeightToLow.forEach((item) => {
            deathAmount.push(item.TotalDeaths);
            countiesCode.push(item.CountryCode);
          });
          vm.series = [{
            data: deathAmount,
          }];
          vm.chartOptions = {
            xaxis: {
              categories: countiesCode,
            },
          };
        });
    },
    pageCallback(page) {
      const vm = this;
      vm.currentPage = page - 1;
    },
    goTopShow() {
      const scrollTop = document.documentElement.scrollTop
        || window.pageYOffset
        || document.body.scrollTop;
      if (scrollTop > 300) {
        // 滾動高度可調
        $('.go-top').show();
      } else {
        $('.go-top').hide();
      }
    },
    goTop() {
      $('html, body').stop().animate({
        scrollTop: 0,
      });
    },
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
</style>
