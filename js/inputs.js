import { SortInputFactory } from "./factories/sortInputFactory.js";

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
const ingredientsInputFactory = new SortInputFactory("ingredients");
ingredientsInputFactory.renderListData(null);

const appliancesInputFactory = new SortInputFactory("appliances");
appliancesInputFactory.renderListData(null);

const ustensilsInputFactory = new SortInputFactory("ustensils");
ustensilsInputFactory.renderListData(null);
