import { recipes } from '../recipes.js';
import { recipesByAppliance } from '../initializeRecipeMaps.js';

export const sortByIngredient = (userInput) => {
  if (userInput.length < 3 || !recipesByAppliance[userInput]) {
    return recipes;
  }
  return recipesByAppliance[userInput];
}
