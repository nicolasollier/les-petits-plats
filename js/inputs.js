const dropdownInputs = document.querySelectorAll(".input-dropdown");
const dropdownLists = document.querySelectorAll(".dropdown-list");

// Add active class to input when focused
dropdownInputs.forEach((input) => {
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

// Filter recipes by name, ingredients and ustensils
const filterRecipes = (recipes, searchInput) => {
  const searchValue = searchInput.value.toLowerCase();

  return recipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    return (
      recipeName.includes(searchValue) ||
      recipeIngredients.some((ingredient) =>
        ingredient.includes(searchValue)
      ) ||
      recipeUstensils.some((ustensil) => ustensil.includes(searchValue))
    );
  });
};

// Handles advanced search
const filterIngredients = (recipes) => {
  const dataList = document.querySelector("#ingredients-list");
  const ingredients = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });

    const list1 = ingredients.slice(0, 10);
    const list2 = ingredients.slice(10, 20);
    const list3 = ingredients.slice(20, 30);

    const listItems1 = list1
      .map((ingredient) => `<p>${ingredient}</p>`)
      .join("");
    const listItems2 = list2
      .map((ingredient) => `<p>${ingredient}</p>`)
      .join("");
    const listItems3 = list3
      .map((ingredient) => `<p>${ingredient}</p>`)
      .join("");

    dataList.innerHTML = `
      <div class="row">
        <div class="col">${listItems1}</div>
        <div class="col">${listItems2}</div>
        <div class="col">${listItems3}</div>
      </div>
    `;
  });
};

const filterAppliances = (recipes) => {
  const dataList = document.querySelector("#appliances-list");
  const appliances = [];

  recipes.forEach((recipe) => {
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }

    const list1 = appliances.slice(0, 10);
    const list2 = appliances.slice(10, 20);
    const list3 = appliances.slice(20, 30);

    const listItems1 = list1
      .map((appliance) => `<p>${appliance}</p>`)
      .join("");
    const listItems2 = list2
      .map((appliance) => `<p>${appliance}</p>`)
      .join("");
    const listItems3 = list3
      .map((appliance) => `<p>${appliance}</p>`)
      .join("");

    dataList.innerHTML = `
      <div class="row">
        <div class="col">${listItems1}</div>
        <div class="col">${listItems2}</div>
        <div class="col">${listItems3}</div>
      </div>
    `;
  });
};

const filterUstensils = (recipes) => {
  const dataList = document.querySelector("#ustensils-list");
  const ustensils = [];

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
      }
    });

    const list1 = ustensils.slice(0, 10);
    const list2 = ustensils.slice(10, 20);
    const list3 = ustensils.slice(20, 30);

    const listItems1 = list1
      .map((ustensil) => `<p>${ustensil}</p>`)
      .join("");
    const listItems2 = list2
      .map((ustensil) => `<p>${ustensil}</p>`)
      .join("");
    const listItems3 = list3
      .map((ustensil) => `<p>${ustensil}</p>`)
      .join("");

    dataList.innerHTML = `
      <div class="row">
        <div class="col">${listItems1}</div>
        <div class="col">${listItems2}</div>
        <div class="col">${listItems3}</div>
      </div>
    `;
  });
};

export { filterRecipes, filterIngredients, filterAppliances, filterUstensils };

