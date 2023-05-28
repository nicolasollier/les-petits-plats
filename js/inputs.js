const inputs = document.querySelectorAll(".input-dropdown");

const inputsHandler = inputs.forEach(input => {
  console.log(input);
  input.addEventListener("focus", () => {
    input.classList.add("active");
  });

  input.addEventListener("blur", () => {
    input.classList.remove("active");
  }); 
});

export { inputsHandler }