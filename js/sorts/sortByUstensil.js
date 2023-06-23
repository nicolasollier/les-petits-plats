import { recipes } from '../recipes.js';
import { recipesByUstensil } from '../initializeRecipeMaps.js';

export const sortByIngredient = (userInput) => {
  if (!recipesByUstensil[userInput]) {
    return recipes;
  }
  return recipesByUstensil[userInput];
}
