import { recipes } from './recipes.js';

let appliances = [];

function createAppliances(recipes) {
  recipes.forEach(recipe => {
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
  })
}

createAppliances(recipes);
export { appliances };