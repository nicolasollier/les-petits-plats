export class RecipeFactory {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
  }

  truncateDescription() {
    const description = this.description;
    const maxLength = 175;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }

  render() {
    const recipe = document.createElement('article');
    recipe.classList.add('recipe');
    recipe.innerHTML = `
    <img class="recipe__img" src="https://via.placeholder.com/300x200.png?text=Recipe+Image" alt="${this.name} cover">
      <div class="recipe__header">
        <h2 class="recipe__title">${this.name}</h2>
        <div class="recipe__time">
          <div class="recipe__time-icon"></div>
          ${this.time} min
        </div>
      </div>
      <div class="recipe__body">
        <div class="recipe__ingredients">
          <ul class="recipe__ingredients-list">
            ${this.ingredients.map(ingredient => `<li class="recipe__ingredient">${ingredient.ingredient} ${ingredient.quantity ? '- ' + ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''}</li>`).join('')}
          </ul>
        </div>
        <div class="recipe__description">
          ${this.truncateDescription()}
        </div>
      </div>
    `;
    return recipe;
  }
}