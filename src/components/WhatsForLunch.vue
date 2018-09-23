<!-- Encapsulating all functionality for What's for lunch in its own view
Could be used as a route for a larger app in future -->

<template>
  <div class="lunch">
    <h1>What's For Lunch</h1>
    <Card v-for="(recipe, index) in recipesAvailableSorted" :key="index" :title="recipe.title"></Card>
    <Button class="lunch_recipes-button" @click="getLunchRecipes">What's For Lunch</Button>
  </div>
</template>

<script>
import Button from '../ui/Button.vue';
import Card from '../ui/Card.vue';

export default {
  name: 'WhatsForLunch',
  components: {
    Button,
    Card
  },
  computed: {
    recipesAvailableSorted() {
      return this.$store.getters.recipesAvailableSorted
    }
  },
  methods: {
    getLunchRecipes() {
      // fire an async store action to fetch recipes and ingredients
      // then commit them to state. triggering the list thats bound to sorted recipes to rerender       
      // currently doesn't stop someone from hitting the button twice
      this.$store.dispatch('fetchRecipes');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lunch_recipes-button {
    margin-top: 10px;
  }
</style>
