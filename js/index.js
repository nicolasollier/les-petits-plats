import { recipes } from "./recipes.js";
import { inputStateHandler } from "./inputs.js";

import { recipesById, recipesByIngredient, recipesByUtensil, recipesByAppliance, recipesByWord } from './initializeRecipeMaps.js';
console.log('\nBy id: ', recipesById, '\nByWord: ', recipesByWord,'\nBy ingredient: ', recipesByIngredient, '\nBy utensil: ', recipesByUtensil, '\nBy appliance: ', recipesByAppliance);

import { RecipeFactory } from "./factories/recipeFactory.js";

const searchInput = document.querySelector("#search-input");


const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
};

const updateRecipesList = () => {
  searchInput.addEventListener("keyup", (e) => {
    let userInput = e.target.value.toLowerCase();
    
    if(userInput.length === 0) {
      displayRecipes(recipes);
    }
    
    if (userInput.length >= 3 && recipesByWord[userInput]) {
      displayRecipes(recipesByWord[userInput]);
    }
  });
};

function init() {
  inputStateHandler;
  displayRecipes(recipes);
  searchInput && updateRecipesList()
}

init();
