export const createFilterFactory = (dataListId, getValueFromRecipe) => {
  return (recipes) => {
    const dataList = document.querySelector(`#${dataListId}`);
    console.log(dataList)
    const items = [];

    recipes.forEach((recipe) => {
      const values = getValueFromRecipe(recipe);
      values.forEach((value) => {
        if (!items.includes(value)) {
          items.push(value);
        }
      });

      const list1 = items.slice(0, 10);
      const list2 = items.slice(10, 20);
      const list3 = items.slice(20, 30);

      const listItems1 = list1
        .map((item) => `<p>${item}</p>`)
        .join("");
      const listItems2 = list2
        .map((item) => `<p>${item}</p>`)
        .join("");
      const listItems3 = list3
        .map((item) => `<p>${item}</p>`)
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
};