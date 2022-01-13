// Model: Note object
class Note {
  constructor(text) {
    this.text = text
  }
}

// View: Handle UI operations
class UI { 
  static displayNote() {

    const storedNotes = Store.getNote()

    storedNotes.forEach((note) => UI.addNoteToList(note))
  }

  static addNoteToList(note) {
    const theList = document.querySelector('#theList')
    const li = document.createElement('li')

    li.innerHTML = `
      <li
        style = "
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          margin-bottom: 0.5rem;
        "
      >
        <p class = "mb-0">${note.text}</p>  
        <i 
          class = "fas fa-minus-circle delete"
          style = "cursor: pointer;"
        >
        </i>
      </li>
    `

    theList.appendChild(li)

  }

  static removeNoteFromList(elTarget) {
    if(elTarget.classList.contains('delete')) {
      elTarget.parentElement.remove()
    }
  }

  static clearAllNotes() {
    const theList = document.querySelector('#theList')
    while (theList.firstChild) {
      //The list is LIVE so it will re-index each call
      theList.removeChild(theList.firstChild);
    }
  }

  static resetField() {
    document.querySelector('#newItem').value = ""
    document.querySelector('#newItem').focus()
  }

  static showAlert() {
    const alert = document.querySelector('.alert')

    // show on UI
    alert.classList.remove('d-none')

    // remove from UI after 3 sec
    setTimeout(() => {
      alert.classList.add('d-none')
    }, 2000);
  }
}

// Storage: Handle storage operations
class Store {
  static getNote() {
    let notes = localStorage.getItem('notes') !== null ? JSON.parse(localStorage.getItem('notes')) : []

    return notes
  }

  static addNote(myNote) {
    let notes = Store.getNote()

    notes.push(myNote)

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes))
  }

  static removeNote(elTarget) {
    let notes = Store.getNote()

    notes.splice(UI.removeNoteFromList(elTarget), 1)

    localStorage.setItem('notes', JSON.stringify(notes))
  }

  static clearNotes() {
    let notes = []

    localStorage.setItem('notes', JSON.stringify(notes))
  }
}

// Controller: display notes on app start
document.addEventListener('DOMContentLoaded', UI.displayNote)

// Controller: add the notes
document.querySelector('#theForm').addEventListener('submit', (e) => {
  e.preventDefault()

  let newNote = document.querySelector('#newItem').value

  // Form validation
  if(newNote !== "") {
    const myNote = new Note(newNote)

    UI.addNoteToList(myNote)

    Store.addNote(myNote)

    UI.resetField()
  } else {
    UI.showAlert()
  }
})

// Controller: remove the notes
document.querySelector('#theList').addEventListener('click', (e) => {
  UI.removeNoteFromList(e.target)
  Store.removeNote(e.target)
})

// Controller: clear all the notes
document.querySelector('.clearNotes').addEventListener('click', () => {
  UI.clearAllNotes()
  Store.clearNotes()
})