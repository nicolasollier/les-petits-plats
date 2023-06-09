import { RecipeFactory } from "./factories/recipeFactory.js";
import { searchInputHandler } from "./inputs.js";
import { sortByWord } from "./sorts/sortByWord.js";

const displayRecipes = (recipes) => {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
};

window.addEventListener("updateWordList", (e) => {
  const userInput = e.detail.value;
  const filteredRecipes = sortByWord(userInput);

  applySort(filteredRecipes);
});

function applySort(recipes) {
  !recipes && (recipes = sortByWord(""));
  displayRecipes(recipes);
}

function init() {
  searchInputHandler;
  applySort();
}

init();