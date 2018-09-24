// Leveraging getter functions solve the problem step by step
// Each step is testable in isolation
// Could have also avoided getters and wrote the data transformation as a series of pure functions 

export default {
    // create new array of ingredients with dates as Date Objects
    ingredientsWithDate(state) {
        return state.ingredients.map(ingredient => ({
            title: ingredient.title,
            useBy: new Date(ingredient['use-by']),
            bestBefore: new Date(ingredient['best-before'])
        }));
    },
    // get array of not expired ingredients 
    ingredientsUseByNotExpired(state, getters) {
        const today = new Date();
        return getters.ingredientsWithDate
            .filter(ingredient => ingredient.useBy >= today)
            .map(ingredient => ingredient.title);
    },
    // get array of ingredients past best before date
    ingredientsBestBeforeExpired(state, getters) {
        const today = new Date();
        return getters.ingredientsWithDate
            .filter(ingredient => ingredient.bestBefore < today)
            .map(ingredient => ingredient.title);
    },
    // get array of recipes without expired ingredients
    recipesAvailable(state, getters) {
        
        return state.recipes.filter(recipe => {
            // must have every ingredient for the recipe
            return recipe.ingredients.every(ingredient => {
                return getters.ingredientsUseByNotExpired.includes(ingredient);
            });
        });
    },
    // get available recipes sorted with expired best-before at the bottom
    recipesAvailableSorted(state, getters) {

        // get all available recipes without expired best before
        const bestBeforeNotExpired = getters.recipesAvailable.filter(recipe => {
            // make sure every ingredient of the recipe is not in the best before expired list
            return recipe.ingredients.every(ingredient => {
                return !getters.ingredientsBestBeforeExpired.includes(ingredient);
            });
        });
        // get all available recipes with expired best before
        const bestBeforeExpired = getters.recipesAvailable.filter(recipe => {
            // make sure at least one ingredient of the recipe is in the best before expired list
            return recipe.ingredients.some(ingredient => {
                return getters.ingredientsBestBeforeExpired.includes(ingredient);
            });
        });

        // concat expired recipes at the bottom
        return bestBeforeNotExpired.concat(bestBeforeExpired);
    }
}