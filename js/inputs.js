const dropdownInputs = document.querySelectorAll(".input-dropdown");

// Add active class to input when focused
dropdownInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("active");
  });

  input.addEventListener("blur", () => {
    input.classList.remove("active");
  });
});

// Filter recipes by name, ingredients and ustensils
const filterRecipes = (recipes, searchInput) => {
  const filteredRecipes = [];

  recipes.forEach((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );
    const searchValue = searchInput.value.toLowerCase();

    if (recipeName.includes(searchValue)) {
      filteredRecipes.push(recipe);
    }
    if (recipeIngredients.some((ingredient) => ingredient.includes(searchValue))) {
      filteredRecipes.push(recipe);
    }
    if (recipeUstensils.some((ustensil) => ustensil.includes(searchValue))) {
      filteredRecipes.push(recipe);
    }
  });

  return filteredRecipes;
};

export { filterRecipes };