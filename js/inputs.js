// Watch user input and emit to index.js to update recipes to display
export const searchInputHandler = document.querySelector("#search-input").addEventListener("input", (e) => {
  const updateWordListEvent = new CustomEvent("updateWordList", {
    detail: {
      value: e.target.value,
    },
  });
  window.dispatchEvent(updateWordListEvent); // Dispatching the created event
});