import { RecipeFactory } from "./factories/recipeFactory.js";
import { searchInputHandler } from "./inputs.js";
import { recipes } from "./recipes.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
};

// Watch the main input and update the recipes to display
window.addEventListener("updateWordList", (e) => {});

function init() {
  searchInputHandler;
  displayRecipes(recipes)
}

init();