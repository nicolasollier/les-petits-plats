import { recipes } from "./recipes.js";

// Hasmaps of recipes by id, by ingredient, by utensil and by appliance
let recipesById = {};
let recipesByWord = {};
let recipesByIngredient = {};
let recipesByUstensil = {};
let recipesByAppliance = {};

// Creates the hasmaps by iterating over recipes.js
recipes.forEach((recipe) => {
  // Creates a hashmap of recipes by id
  recipesById[recipe.id] = recipe;
  
  // Creates a hashmap of recipes by appliance
  const normalizedAppliance = recipe.appliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  !recipesByAppliance[normalizedAppliance] && (recipesByAppliance[normalizedAppliance] = []);
  recipesByAppliance[normalizedAppliance].push(recipe);

  
  // Creates a hashmap of recipes by words finding in recipe's name
  recipe.name.toLowerCase().split(' ').forEach((word) => {
    // Allows search to be case sensitive
    word.toLowerCase();
    
    !recipesByWord[word] && (recipesByWord[word] = []);
    recipesByWord[word].push(recipe);
  });
  
  // Creates a hashmap of recipes by ingredient
  recipe.ingredients.forEach((ingredient) => {
    // Remove accents and convert to lowercase
    const normalizedIngredient = ingredient.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
    !recipesByIngredient[normalizedIngredient] && (recipesByIngredient[normalizedIngredient] = []);
    recipesByIngredient[normalizedIngredient].push(recipe);
  });
  
  // Creates a hashmap of recipes by utensil
  recipe.ustensils.forEach((utensil) => {
    // Remove accents and convert to lowercase
    const normalizedUtensil = utensil.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    !recipesByUstensil[normalizedUtensil] && (recipesByUstensil[normalizedUtensil] = []);
    recipesByUstensil[normalizedUtensil].push(recipe);
  });
});

export { recipesByWord, recipesByIngredient, recipesByAppliance, recipesByUstensil }