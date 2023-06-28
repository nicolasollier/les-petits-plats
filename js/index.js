import { RecipeFactory } from "./factories/recipeFactory.js";
import { createsFilterInputs } from "./inputs.js";
import { recipes } from "./recipes.js";
import { recipesByIngredient, recipesByAppliance, recipesByUstensil } from "./initializeRecipeMaps.js";

let activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

document.addEventListener("updateActiveFilters", (e) => {
  const { action, type, data } = e.detail;
  
  if(activeFilters.hasOwnProperty(type) && action === "add") {
    activeFilters[type].push(data);
  } else if (activeFilters.hasOwnProperty(type) && action === "remove") {
    activeFilters[type] = activeFilters[type].filter((filter) => filter !== data);
  }

  filterRecipes();
});

function displayRecipes(recipes) {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
};

function filterRecipes() {
  let filteredRecipes = [...recipes];

  // Filter recipes by active filters
  if (activeFilters.ingredients.length > 0) {
    activeFilters.ingredients.forEach((ingredient) => {
      const matchingRecipes = recipesByIngredient[ingredient];
      filteredRecipes = filteredRecipes.filter(recipe => matchingRecipes.includes(recipe));
    });
  }
  if (activeFilters.appliances.length > 0) {
    activeFilters.appliances.forEach((appliance) => {
      const matchingRecipes = recipesByAppliance[appliance];
      filteredRecipes = filteredRecipes.filter(recipe => matchingRecipes.includes(recipe));
    });
  }
  if (activeFilters.ustensils.length > 0) {
    activeFilters.ustensils.forEach((ustensil) => {
      const matchingRecipes = recipesByUstensil[ustensil];
      filteredRecipes = filteredRecipes.filter(recipe => matchingRecipes.includes(recipe));
    });
  }

  displayRecipes(filteredRecipes);
}


function init() {
  createsFilterInputs();
  filterRecipes();
}

init();