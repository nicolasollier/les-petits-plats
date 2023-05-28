import { recipes } from './recipes.js';

let ingredients = [];

function createIngredients(recipes) {
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    })
  })
}

createIngredients(recipes);
export { ingredients };