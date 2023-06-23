// Import recipesByIngredients from initializeRecipeMaps.js
import { recipes } from '../recipes.js';
import { recipesByIngredient } from '../initializeRecipeMaps.js';

export const sortByIngredient = (userInput) => {
  if (!recipesByIngredient[userInput]) {
    return recipes;
  }
  return recipesByIngredient[userInput];
}
