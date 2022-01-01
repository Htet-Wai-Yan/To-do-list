let theForm = document.querySelector("#theForm");
let theList = document.querySelector("#theList");
let theField = document.querySelector("#newItem");
let theAlert = document.querySelector("#theAlert");

theForm.addEventListener("submit", (event) => {
  //   disable form default refresh behaviour
  event.preventDefault();
  addItem(theField.value);
});

function addItem(inputValue) {
  //   the HTML template
  theNewItem = `
    <li class = "my-2">
      <div>
        <input class="form-check-input me-1" type="checkbox" onchange="toggleCheckbox(this)" /> ${inputValue}
      </div>
      <i class = "fas fa-trash-alt" id = "deleteBtn" onclick = "deleteNote(this)" style = "cursor: pointer"></i>
    </li>
  `;

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
  click.parentElement.classList.toggle("checkDone");
}

// delete items when trash icon is click
function deleteNote(click) {
  click.parentElement.remove()
}
