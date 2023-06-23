export class SortInputFactory {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  renderInput() {
    const filtersList = document.querySelector(".filters-list");
    const dropdownList = document.createElement("div");
    const inputGroupWrapper = document.createElement("div");
    const input = document.createElement("input");

    dropdownList.id = `${this.type}-list`;
    dropdownList.classList.add("dropdown-list", `${this.type}-list`);

    inputGroupWrapper.classList.add("input-group__wrapper");

    input.id = `${this.type}-input`;
    input.classList.add("input-dropdown");
    input.placeholder = `${
      this.type.charAt(0).toUpperCase() + this.type.slice(1)
    }`;

    if (this.type === "ingredients") {
      input.classList.add("input-bg-blue");
    } else if (this.type === "appliances") {
      input.classList.add("input-bg-green");
    } else if (this.type === "ustensils") {
      input.classList.add("input-bg-orange");
    }

    //Toggle class when focus on input
    input.addEventListener("focus", () => {
      input.classList.add("active");
      dropdownList.classList.add("active");
    });
    input.addEventListener("blur", () => {
      input.classList.remove("active");
      dropdownList.classList.remove("active");
    });

    inputGroupWrapper.appendChild(input);
    inputGroupWrapper.appendChild(dropdownList);

    filtersList.appendChild(inputGroupWrapper);
  }

  renderListData(userInput) {
    const dataList = this.data;
    const dropdownList = document.querySelector(`.${this.type}-list`);
    
    dropdownList.innerHTML = "";

    if (userInput) {
      const filteredDataList = dataList.filter((data) =>
        data.toLowerCase().includes(userInput.toLowerCase())
      );

      filteredDataList.forEach((data) => {
        const listItem = document.createElement("div");
        listItem.classList.add("dropdown-list__item");
        listItem.innerHTML = data;
        dropdownList.appendChild(listItem);
      });
    } else {
      dataList.forEach((data) => {
        const listItem = document.createElement("div");
        listItem.classList.add("dropdown-list__item");
        listItem.innerHTML = data;
        dropdownList.appendChild(listItem);
      });
    }
  }
}
