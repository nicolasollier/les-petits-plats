import { recipes } from '../recipes.js';
import { recipesByUstensil } from '../initializeRecipeMaps.js';

export const sortByIngredient = (userInput) => {
  if (userInput.length < 3 || !recipesByUstensil[userInput]) {
    return recipes;
  }
  return recipesByUstensil[userInput];
}
