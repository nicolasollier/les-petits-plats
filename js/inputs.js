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
      recipeIngredients.some((ingredient) => ingredient.includes(searchValue)) ||
      recipeUstensils.some((ustensil) => ustensil.includes(searchValue))
    );
  });
};


export { filterRecipes };