export class SortInputFactory {
  constructor(type) {
    this.type = type;
  }

  renderListData(listData) {
    const filtersList = document.querySelector('.filters-list');

    const inputGroupWrapper = document.createElement('div');
    inputGroupWrapper.classList.add('input-group__wrapper');
    
    const input = document.createElement('input');
    input.id = `${this.type}-input`;
    input.classList.add('input-dropdown');
    input.placeholder = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;

    const dropdownList = document.createElement('div');
    dropdownList.id = `${this.type}-list`;
    dropdownList.classList.add('dropdown-list', `${this.type}-list`);
    
    if(this.type === 'ingredients') {
      input.classList.add('input-bg-blue');
    } else if(this.type === 'appliances') {
      input.classList.add('input-bg-green');
    } else if(this.type === 'ustensils') {
      input.classList.add('input-bg-orange');
    }

    //Toggle class when focus on input
    input.addEventListener('focus', () => {
      input.classList.add('active');
      dropdownList.classList.add('active');
    });
    input.addEventListener('blur', () => {
      input.classList.remove('active');
      dropdownList.classList.remove('active');
    });

    inputGroupWrapper.appendChild(input);
    inputGroupWrapper.appendChild(dropdownList);

    filtersList.appendChild(inputGroupWrapper);
  }
}