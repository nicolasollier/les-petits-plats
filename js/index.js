import { RecipeFactory } from "./factories/recipeFactory.js";
import { createsFilterInputs } from "./inputs.js";
import { recipes } from "./recipes.js";
import { generateHashmap, recipesByIngredient, recipesByAppliance, recipesByUstensil } from "./initializeRecipeMaps.js";

// Global variables
let userInput = "";
let filteredRecipes = [...recipes];
let activeFilters = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

document.addEventListener("updateSearchInput", (e) => {
  userInput = e.detail.userInput.toLowerCase();
  filterRecipes();
});

document.addEventListener("updateActiveFilters", (e) => {
  const { action, type, data } = e.detail;
  
  if(activeFilters.hasOwnProperty(type) && action === "add") {
    activeFilters[type].push(data);
  } else if (activeFilters.hasOwnProperty(type) && action === "remove") {
    let newActiveFilters = [];
    for(let i = 0; i < activeFilters[type].length; i++) {
      if(activeFilters[type][i] !== data) {
        newActiveFilters.push(activeFilters[type][i]);
      }
    }
    activeFilters[type] = newActiveFilters;
  }

  filterRecipes();
});

function displayRecipes(recipes) {
  const recipesSection = document.querySelector("#recipes-section");
  recipesSection.innerHTML = "";

  //Handles no recipes found
  if (recipes.length === 0) {
    const noRecipesContainer = document.createElement("div");
    const noRecipesImage = document.createElement("img");
    const noRecipesMessage = document.createElement("p");
    
    noRecipesImage.src = "./images/assets/not_found.jpg";
    noRecipesImage.alt = "No recipes found";
    noRecipesImage.style.height = "250px";
    noRecipesMessage.innerText = "Aucune recette trouvée... 😥";

    noRecipesContainer.appendChild(noRecipesImage);
    noRecipesContainer.appendChild(noRecipesMessage);
    recipesSection.appendChild(noRecipesContainer);

    return;
  }

  for(let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  }
};

function filterRecipes() {
  filteredRecipes = [...recipes];

  //Search if user input matches recipe name, description or ingredients
  if(userInput.length >= 3 || userInput.length === 0) {
    let newFilteredRecipes = [];
    for(let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      let recipeIngredients = [];
      for(let j = 0; j < recipe.ingredients.length; j++) {
        recipeIngredients.push(recipe.ingredients[j].ingredient);
      }
      if(recipe.name.toLowerCase().includes(userInput) ||
        recipe.description.toLowerCase().includes(userInput) ||
        recipeIngredients.some((ingredient) =>
          ingredient.toLowerCase().includes(userInput)
        )) {
        newFilteredRecipes.push(recipe);
      }
    }
    filteredRecipes = newFilteredRecipes;
  }

  // Filter recipes by active filters
  for(let filterType in activeFilters) {
    if(activeFilters[filterType].length > 0) {
      for(let i = 0; i < activeFilters[filterType].length; i++) {
        const filter = activeFilters[filterType][i];
        const matchingRecipes = recipesByIngredient[filter] || recipesByAppliance[filter] || recipesByUstensil[filter];
        let newFilteredRecipes = [];
        for(let j = 0; j < filteredRecipes.length; j++) {
          const recipe = filteredRecipes[j];
          if(matchingRecipes.includes(recipe)) {
            newFilteredRecipes.push(recipe);
          }
        }
        filteredRecipes = newFilteredRecipes;
      }
    }
  }

  generateHashmap(filteredRecipes);
  createsFilterInputs(recipesByIngredient, recipesByAppliance, recipesByUstensil);
  displayRecipes(filteredRecipes);
}

function init() {
  generateHashmap(recipes);
  createsFilterInputs(recipesByIngredient, recipesByAppliance, recipesByUstensil);
  displayRecipes(recipes);
}

init();
