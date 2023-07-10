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
    activeFilters[type] = activeFilters[type].filter((filter) => filter !== data);
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

  recipes.forEach((recipe) => {
    const recipeFactory = new RecipeFactory(recipe);
    recipesSection.appendChild(recipeFactory.render());
  });
};

function filterRecipes() {
  filteredRecipes = [...recipes];

  //Search if user input matches recipe name, description or ingredients
  if(userInput.length >= 3 || userInput.length === 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
      return (
        recipe.name.toLowerCase().includes(userInput) ||
        recipe.description.toLowerCase().includes(userInput) ||
        recipeIngredients.some((ingredient) =>
          ingredient.toLowerCase().includes(userInput)
        )
      );
    });
  }

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