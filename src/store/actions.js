// export default {}

import { recipes } from "./recipes.json";
import { ingredients } from "./ingredients.json";

export default {
    // in a real app, this will make an async fetch to an api to retrieve data
    // here I decided to use a single action for two pieces of data. you can also separate them
    async fetchRecipes({ commit }) {
      commit('setIngredients', { ingredients });
      commit('setRecipes', { recipes });
      return true;
    }
}