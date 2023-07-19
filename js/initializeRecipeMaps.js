// Hasmaps of recipes by id, by ingredient, by utensil and by appliance
let recipesByIngredient = {};
let recipesByUstensil = {};
let recipesByAppliance = {};

function generateHashmap(recipes) {
  //Clear the hashmaps
  recipesByIngredient = {};
  recipesByUstensil = {};
  recipesByAppliance = {};

  // Creates the hasmaps by iterating over recipes.js
  for(let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Creates a hashmap of recipes by appliance
    const normalizedAppliance = recipe.appliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if(!recipesByAppliance[normalizedAppliance]) {
      recipesByAppliance[normalizedAppliance] = [];
    }
    recipesByAppliance[normalizedAppliance].push(recipe);
    
    // Creates a hashmap of recipes by ingredient
    for(let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];

      // Remove accents and convert to lowercase
      const normalizedIngredient = ingredient.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
      if(!recipesByIngredient[normalizedIngredient]) {
        recipesByIngredient[normalizedIngredient] = [];
      }
      recipesByIngredient[normalizedIngredient].push(recipe);
    }
    
    // Creates a hashmap of recipes by utensil
    for(let k = 0; k < recipe.ustensils.length; k++) {
      const utensil = recipe.ustensils[k];

      // Remove accents and convert to lowercase
      const normalizedUtensil = utensil.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      if(!recipesByUstensil[normalizedUtensil]) {
        recipesByUstensil[normalizedUtensil] = [];
      }
      recipesByUstensil[normalizedUtensil].push(recipe);
    }
  }

  //Creates custom event to update recipes could thrown an error or take loading params
  const event = new CustomEvent("updateHashmap");
  document.dispatchEvent(event);
}

export { generateHashmap, recipesByIngredient, recipesByAppliance, recipesByUstensil }
