let theForm = document.getElementById("theForm");
let theList = document.getElementById("theList");
let theField = document.getElementById("newItem");
let theAlert = document.getElementById("theAlert");

theForm.addEventListener("submit", (event) => {
  //   disable form default refresh behaviour
  event.preventDefault();
  addItem(theField.value);
});

function addItem(inputValue) {
  //   the HTML template
  theNewItem = `
  <li class = "py-2">
    <input class="form-check-input me-1" type="checkbox" value="" aria-label="..." onchange     ="toggleCheckbox(this)" /> ${inputValue}
  </li>`;

  if (theField.value !== "") {
    //   add "where" and "item"
    theList.insertAdjacentHTML("beforeend", theNewItem);

    //   empty field after submit
    theField.value = "";

    //   focus field again after submit
    theField.focus();

    //   toggle alert
    theAlert.classList.add("d-none");
  } else {
    theAlert.classList.remove("d-none");
  }
}

// toggle css class when the checkbox is toggle
function toggleCheckbox(click) {
  click.parentElement.classList.toggle("toggleStyle");
  //   delete after .5s
  // setTimeout(() => click.parentElement.remove(), 500);
}
