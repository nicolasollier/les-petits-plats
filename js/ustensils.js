import { recipes } from "./recipes.js";

let ustensils = [];

function createUstensils(recipes) {
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
      }
    });
  });
}

createUstensils(recipes);
export { ustensils };