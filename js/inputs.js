import { SortInputFactory } from "./factories/sortInputFactory.js";
import {
  recipesByAppliance,
  recipesByIngredient,
  recipesByUstensil,
} from "./initializeRecipeMaps.js";

// Handles main search input
const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", (e) => {
  const event = new CustomEvent("updateSearchInput", {
    detail: {
      userInput: e.target.value,
    },
  });
  document.dispatchEvent(event);
});

// Watch user input and emit to index.js to update recipes to display
export const createsFilterInputs = () => {
  // Render the dropdown lists
  let ingredientsList = Object.keys(recipesByIngredient);
  let appliancesList = Object.keys(recipesByAppliance);
  let ustensilsList = Object.keys(recipesByUstensil);

  const ingredientsInputFactory = new SortInputFactory(
    "ingredients",
    ingredientsList
  );
  ingredientsInputFactory.renderInput();
  ingredientsInputFactory.renderListData();

  document.querySelector("#ingredients-input").addEventListener("input", (e) => {
      ingredientsInputFactory.renderListData(e.target.value);
    });

  const appliancesInputFactory = new SortInputFactory(
    "appliances",
    appliancesList
  );
  appliancesInputFactory.renderInput();
  appliancesInputFactory.renderListData();

  document.querySelector("#appliances-input").addEventListener("input", (e) => {
    appliancesInputFactory.renderListData(e.target.value);
  });

  const ustensilsInputFactory = new SortInputFactory(
    "ustensils",
    ustensilsList
  );
  ustensilsInputFactory.renderInput();
  ustensilsInputFactory.renderListData();

  document.querySelector("#ustensils-input").addEventListener("input", (e) => {
    ustensilsInputFactory.renderListData(e.target.value);
  });
};
