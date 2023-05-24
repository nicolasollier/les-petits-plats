import { recipes } from './recipes.js';
import { RecipeFactory } from './factories/recipeFactory.js';

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector('#recipes-section');
  recipesSection.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
}

displayRecipes(recipes);
