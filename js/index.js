import { recipes } from "./recipes.js";
import { RecipeFactory } from "./factories/recipeFactory.js";
import { filterRecipes } from "./inputs.js";

const searchInput = document.querySelector("#search-input");

let filteredRecipes = [];

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
};

const updateRecipesList = () => {
  searchInput.addEventListener("keyup", () => {
    filteredRecipes = filterRecipes(recipes, searchInput);
    displayRecipes(filteredRecipes);
  });
};

function init() {
  filteredRecipes = [...recipes];

  displayRecipes(recipes);
  searchInput && updateRecipesList();
}

init();
