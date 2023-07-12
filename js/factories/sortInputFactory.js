import { BadgeFactory } from "./badgeFactory.js";

export class SortInputFactory {
  constructor(dataList, type) {
    this.dataList = dataList;
    this.type = type;
  }

  renderInput() {
    const inputsWrapper = document.querySelector(".inputs-wrapper");
    const dropdownList = document.createElement("ul");
    const inputGroupWrapper = document.createElement("div");
    const input = document.createElement("input");
   
    // Clear the specific input group wrapper
    const oldInputGroupWrapper = document.querySelector(`#${this.type}-input-group-wrapper`);
    if (oldInputGroupWrapper) {
      oldInputGroupWrapper.remove();
    }

    dropdownList.id = `${this.type}-list`
    dropdownList.classList.add("dropdown-list", `${this.type}-list`);
    
    inputGroupWrapper.id = `${this.type}-input-group-wrapper`;
    inputGroupWrapper.classList.add("input-group__wrapper");
    
    input.id = `${this.type}-input`;
    input.classList.add("input-dropdown");
    input.placeholder = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;

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

    //Delay the blur event to allow the user to click on the dropdown list
    input.addEventListener("blur", () => {
      setTimeout(() => {
        input.classList.remove("active");
        dropdownList.classList.remove("active");
      }, 100);
    });

    inputGroupWrapper.appendChild(input);  
    inputGroupWrapper.appendChild(dropdownList);

    inputsWrapper.appendChild(inputGroupWrapper);
  }

  renderListData(dataList, userInput) {
    const dropdownList = document.querySelector(`.${this.type}-list`);

    dropdownList.innerHTML = "";

    if (userInput) {
      const filteredDataList = dataList.filter((data) =>
        data.toLowerCase().includes(userInput.toLowerCase())
      );

      filteredDataList.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-list__item");
        listItem.innerHTML = data.charAt(0).toUpperCase() + data.slice(1);
        dropdownList.appendChild(listItem);

        listItem.addEventListener("click", (e) => {
          e.preventDefault();
          const input = document.querySelector(`#${this.type}-input`);

          const event = new CustomEvent("updateActiveFilters", {
            detail: {
              action: "add",
              type: this.type,
              data: data,
            },
          });
          document.dispatchEvent(event);
          new BadgeFactory(this.type, data).renderBadge();
          
          input.value = "";
        });
      });
    } else {
      dataList.forEach((data) => {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-list__item");
        listItem.innerHTML = data.charAt(0).toUpperCase() + data.slice(1);
        dropdownList.appendChild(listItem);

        listItem.addEventListener("click", (e) => {
          e.preventDefault();
          const input = document.querySelector(`#${this.type}-input`);

          const event = new CustomEvent("updateActiveFilters", {
            detail: {
              action: "add",
              type: this.type,
              data: data,
            },
          });
          document.dispatchEvent(event);
          new BadgeFactory(this.type, data).renderBadge();

          input.value = "";
        });
      });
    }
  }
}
