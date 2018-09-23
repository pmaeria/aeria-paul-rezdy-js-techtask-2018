
<!-- Mock example of a reusable, generic card to display different kinds of content. 
For our purpose now, its a recipe -->
<template>
  <div class="card">
      <span class="card-title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        border-bottom: 1px solid #E7E9E1;
        padding: 10px;
        width: 100%;
        text-align: left;
    }
    .card-title {
        font-size: 14px;
    }
</style>
