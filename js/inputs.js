import { SortInputFactory } from "./factories/sortInputFactory.js";
import { recipesByAppliance, recipesByIngredient, recipesByUstensil } from "./initializeRecipeMaps.js";

// Watch user input and emit to index.js to update recipes to display
export const searchInputHandler = document.querySelector("#search-input").addEventListener("input", (e) => {
  const updateWordListEvent = new CustomEvent("updateWordList", {
    detail: {
      value: e.target.value,
    },
  });
  window.dispatchEvent(updateWordListEvent); // Dispatching the created event
});

// Render the dropdown lists
const ingredientsInputFactory = new SortInputFactory("ingredients", recipesByIngredient);
ingredientsInputFactory.renderInput();
ingredientsInputFactory.renderListData();

const appliancesInputFactory = new SortInputFactory("appliances", recipesByAppliance);
appliancesInputFactory.renderInput();
appliancesInputFactory.renderListData();

const ustensilsInputFactory = new SortInputFactory("ustensils", recipesByUstensil);
ustensilsInputFactory.renderInput();
ustensilsInputFactory.renderListData();
