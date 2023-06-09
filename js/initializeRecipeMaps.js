import { recipes } from "./recipes.js";

// Hasmaps of recipes by id, by ingredient, by utensil and by appliance
export let recipesById = {};
export let recipesByWord = {};
export let recipesByIngredient = {};
export let recipesByUtensil = {};
export let recipesByAppliance = {};

// Creates the hasmaps by iterating over recipes.js
recipes.forEach((recipe) => {
  // Creates a hashmap of recipes by id
  recipesById[recipe.id] = recipe;

  // Creates a hashmap of recipes by appliance
  !recipesByAppliance[recipe.appliance] && (recipesByAppliance[recipe.appliance] = []);

  // Creates a hashmap of recipes by words finding in recipe's name
  recipe.name.toLowerCase().split(' ').forEach((word) => {
    // Allows search to be case sensitive
    word.toLowerCase();
    
    !recipesByWord[word] && (recipesByWord[word] = []);
    recipesByWord[word].push(recipe);
  });

  // Creates a hashmap of recipes by ingredient
  recipe.ingredients.forEach((ingredient) => {
    !recipesByIngredient[ingredient.ingredient] && (recipesByIngredient[ingredient.ingredient] = []);
    recipesByIngredient[ingredient.ingredient].push(recipe);
  });

  // Creates a hashmap of recipes by utensil
  recipe.ustensils.forEach((utensil) => { 
		!recipesByUtensil[utensil] && (recipesByUtensil[utensil] = []);
    recipesByUtensil[utensil].push(recipe);
  });
});
