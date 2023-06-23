import { recipes } from '../recipes.js';
import { recipesByAppliance } from '../initializeRecipeMaps.js';

export const sortByIngredient = (userInput) => {
  if (!recipesByAppliance[userInput]) {
    return recipes;
  }
  return recipesByAppliance[userInput];
}
