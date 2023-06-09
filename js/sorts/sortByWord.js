// Import recipesByWord from initializeRecipeMaps.js
import { recipes } from "../recipes.js";
import { recipesByWord } from "../initializeRecipeMaps.js";

export const sortByWord = (userInput) => {
  if (userInput.length < 3 || !recipesByWord[userInput]) {
    return recipes;
  }
  return recipesByWord[userInput];
};
