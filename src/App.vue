<template>
  <div id="app">
    <WhatsForLunch></WhatsForLunch>
  </div>
</template>

<script>
import WhatsForLunch from './components/WhatsForLunch.vue';

export default {
  name: 'app',
  components: {
    WhatsForLunch
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
