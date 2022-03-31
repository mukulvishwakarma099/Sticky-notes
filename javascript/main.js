const notesContainer = document.getElementById("app");
const addNotesButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNotesElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNotesButton);
});

addNotesButton.addEventListener("click", () => addNotes());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNotesElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNotes(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNotes() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNotesElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNotesButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNotes(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}
