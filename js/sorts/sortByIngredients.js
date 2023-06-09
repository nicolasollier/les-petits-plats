// Import recipesByIngredients from initializeRecipeMaps.js
import { recipesByIngredients } from '../initializeRecipeMaps.js';

export const sortByIngredients = (userInput) => {
    return recipesByIngredients[userInput];
}