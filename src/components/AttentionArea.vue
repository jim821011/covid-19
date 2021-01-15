<template>
  <div>
    <div class="board-card mb-3 p-3"
      v-for="item in covidArr" :key="item.CountryCode">
      <h3 class="board-card-title-2 mb-3">{{ item.Country }} ({{ item.CountryCode }})</h3>
      <div class="attaction-icon">
        <a href="#" @click.prevent="setAttention(item.Country)">
          <i class="fas fa-paperclip fa-2x text-warning"></i>
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
  </div>
</template>

<script>
export default {
  props: {
    covidArr: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    setAttention(item) {
      this.$emit('set-attention', item);
    },
  },
};
</script>

<style>

</style>
