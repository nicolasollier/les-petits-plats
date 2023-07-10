import { SortInputFactory } from "./factories/sortInputFactory.js";

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
export const createsFilterInputs = (recipesByIngredient, recipesByAppliance, recipesByUstensil) => {
  // Render the dropdown lists
  let ingredientsList = Object.keys(recipesByIngredient);
  let appliancesList = Object.keys(recipesByAppliance);
  let ustensilsList = Object.keys(recipesByUstensil);

  const ingredientsInputFactory = new SortInputFactory(ingredientsList, "ingredients");
  ingredientsInputFactory.renderInput();
  ingredientsInputFactory.renderListData(ingredientsList);

  document.querySelector("#ingredients-input").addEventListener("input", (e) => {
    ingredientsInputFactory.renderListData(ingredientsList, e.target.value);
  });

  const appliancesInputFactory = new SortInputFactory(appliancesList, "appliances");
  appliancesInputFactory.renderInput();
  appliancesInputFactory.renderListData(appliancesList);

  document.querySelector("#appliances-input").addEventListener("input", (e) => {
    appliancesInputFactory.renderListData(appliancesList, e.target.value);
  });

  const ustensilsInputFactory = new SortInputFactory(ustensilsList, "ustensils");
  ustensilsInputFactory.renderInput();
  ustensilsInputFactory.renderListData(ustensilsList);

  document.querySelector("#ustensils-input").addEventListener("input", (e) => {
    ustensilsInputFactory.renderListData(ustensilsList, e.target.value);
  });
};
