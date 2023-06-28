import { RecipeFactory } from "./factories/recipeFactory.js";
import { createsFilterInputs } from "./inputs.js";
import { recipes } from "./recipes.js";

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
  let filteredRecipes = recipes;

  // Filter recipes by ingredient
  if (activeFilters.ingredients.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return activeFilters.ingredients.every((ingredient) => {
        return recipe.ingredients.some((recipeIngredient) => {
          return recipeIngredient.ingredient.toLowerCase().includes(ingredient);
        });
      });
    });
  }

  // Filter recipes by appliance
  if (activeFilters.appliances.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return activeFilters.appliances.every((appliance) => {
        return recipe.appliance.toLowerCase().includes(appliance);
      });
    });
  }

  // Filter recipes by ustensil
  if (activeFilters.ustensils.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return activeFilters.ustensils.every((ustensil) => {
        return recipe.ustensils.some((recipeUstensil) => {
          return recipeUstensil.toLowerCase().includes(ustensil);
        });
      });
    });
  }

  displayRecipes(filteredRecipes);
}

function init() {
  createsFilterInputs();
  filterRecipes();
}

init();