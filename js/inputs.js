const dropdownInputs = document.querySelectorAll(".input-dropdown");
const dropdownLists = document.querySelectorAll(".dropdown-list");

// Add active class to input when focused
export const inputStateHandler = dropdownInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("active");

    switch (input.id) {
      case "ingredients-input":
        dropdownLists[0].classList.add("active");
        break;
      case "appliances-input":
        dropdownLists[1].classList.add("active");
        break;
      case "ustensils-input":
        dropdownLists[2].classList.add("active");
        break;
    }
  });

  input.addEventListener("blur", () => {
    input.classList.remove("active");

    switch (input.id) {
      case "ingredients-input":
        dropdownLists[0].classList.remove("active");
        break;
      case "appliances-input":
        dropdownLists[1].classList.remove("active");
        break;
      case "ustensils-input":
        dropdownLists[2].classList.remove("active");
        break;
    }
  });
});