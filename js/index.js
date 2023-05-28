// Data Lists
import { recipes } from './recipes.js';
import { ingredients } from './ingredients.js';
import { appliances } from './appliances.js';
import { ustensils } from './ustensils.js';

// Factories
import { RecipeFactory } from './factories/recipeFactory.js';

// Inputs Handlers
import { inputsHandler } from './inputs.js';

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector('#recipes-section');
  recipesSection.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
}

// console.log(recipes, ingredients, appliances, ustensils);
displayRecipes(recipes);