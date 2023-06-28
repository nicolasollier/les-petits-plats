import { BadgeFactory } from "./badgeFactory.js";

export class SortInputFactory {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  renderInput() {
    const inputsWrapper = document.querySelector(".inputs-wrapper");
    const dropdownList = document.createElement("ul");
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

    let blurTimeoutId; // Declare a variable to hold the timeout ID

    input.addEventListener("blur", () => {
      // Instead of immediately removing classes, set a timeout
      blurTimeoutId = setTimeout(() => {
        input.classList.remove("active");
        dropdownList.classList.remove("active");
      }, 100); // 100ms delay should be enough
    });

    // When a mousedown event occurs on the dropdown, clear the timeout
    dropdownList.addEventListener("mousedown", () => {
      clearTimeout(blurTimeoutId);
    });

    inputGroupWrapper.appendChild(input);
    inputGroupWrapper.appendChild(dropdownList);

    inputsWrapper.appendChild(inputGroupWrapper);
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
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-list__item");
        listItem.innerHTML = data.charAt(0).toUpperCase() + data.slice(1);
        dropdownList.appendChild(listItem);

        listItem.addEventListener("click", (e) => {
          e.preventDefault();
          const input = document.querySelector(`#${this.type}-input`);

          const event = new CustomEvent("updateActiveFilters", {
            detail: {
              type: this.type,
              data: data,
            },
          });
          document.dispatchEvent(event);
          new BadgeFactory(this.type, data).renderBadge();
          
          input.value = "";
          this.renderListData("");
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
          this.renderListData("");
        });
      });
    }
  }
}
