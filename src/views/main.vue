<template>
  <div>
    {{ massage }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      massage: 878,
      covidData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const vm = this;
      const api = 'https://api.covid19api.com/summary';
      vm.$http.get(api)
        .then((res) => {
          console.log(res);
          vm.covidData = res.data.Countries;
        });
    },
  },
};
</script>

<style lang="scss">

</style>
