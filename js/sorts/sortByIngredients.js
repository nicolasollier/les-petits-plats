// Import recipesByIngredients from initializeRecipeMaps.js
import { recipesByIngredients } from '../initializeRecipeMaps.js';
import { recipes } from '../recipes.js';

export const sortByIngredients = (userInput) => {
  if (userInput.length < 3 || !recipesByIngredients[userInput]) {
    return recipes;
  }
  return recipesByIngredients[userInput];
}