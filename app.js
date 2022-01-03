// Global variables
let theForm = document.querySelector("#theForm");
let theList = document.querySelector("#theList");
let theField = document.querySelector("#newItem");
let theAlert = document.querySelector("#theAlert");

let notesInLocalStorage = localStorage.getItem('note')

let noteObj = notesInLocalStorage !== null ? JSON.parse(notesInLocalStorage): []

// Submit event
theForm.addEventListener("submit", (event) => {
  // disable form default refresh behaviour
  event.preventDefault();

  noteObj.push(theField.value.trim())
  localStorage.setItem('note', JSON.stringify(noteObj))

  addItem(noteObj)

  theField.value = ""

});

function deleteItem(click) {
  click.parentElement.remove()
}

function addItem(noteObj) {
  let li = `
      <li class = "my-2">
        <div>
          <input class="form-check-input me-1" type="checkbox" /> ${noteObj.length == 0 ? noteObj[noteObj.length + 1] : noteObj[noteObj.length - 1]}
        </div>
        <i class = "fas fa-trash-alt" id = "deleteBtn" style = "cursor: pointer" onclick = "deleteItem(this)"></i>
      </li>
    `

    theList.insertAdjacentHTML('beforeend', li)
}

function localStorageItem() {
  noteObj.forEach(note => {
    let li = `
      <li class = "my-2">
        <div>
          <input class="form-check-input me-1" type="checkbox" /> ${note}
        </div>
        <i class = "fas fa-trash-alt" id = "deleteBtn" style = "cursor: pointer" onclick = "deleteItem(this)"></i>
      </li>
    `

    theList.insertAdjacentHTML('beforeend', li)
  })
}

localStorageItem()




