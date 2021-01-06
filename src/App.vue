<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
import Main from './views/main.vue';

export default {
  name: 'app',
  components: {
    Main,
  },
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
