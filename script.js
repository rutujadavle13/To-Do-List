// Load saved list from localStorage
window.onload = function () {
  const savedList = localStorage.getItem("todoList");
  if (savedList) {
    document.getElementById("List_item").innerHTML = savedList;
    restoreEventListeners();
  }
};

function addItem() {
  const input = document.getElementById("list_input_text");
  const listText = input.value.trim();

  if (listText === "") {
    alert("Please enter a list item");
    return;
  }

  const List_item = document.getElementById("List_item");

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = listText;

  // Double-click to edit
  span.addEventListener("dblclick", function () {
    const currentText = span.textContent.replace(/^\d+\.\s/, "");
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;
    inputField.className = "edit-input";

    li.replaceChild(inputField, span);
    inputField.focus();

    function saveEdit() {
      const newText = inputField.value.trim();
      if (newText !== "") {
        span.textContent = newText;
        li.replaceChild(span, inputField);
        updateListNumbers();
        saveList();
      } else {
        alert("Item cannot be empty.");
        inputField.focus();
      }
    }

    inputField.addEventListener("blur", saveEdit);
    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });
  });

  li.appendChild(span);

  // Click to toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveList();
  });

  // Right-click to delete
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (confirm("Delete this item?")) {
      li.remove();
      updateListNumbers();
      saveList();
    }
  });

  List_item.appendChild(li);
  input.value = "";
  updateListNumbers();
  saveList();
}

function clearList() {
  if (confirm("Clear all items?")) {
    document.getElementById("List_item").innerHTML = "";
    localStorage.removeItem("todoList");
  }
}

function updateListNumbers() {
  const items = document.querySelectorAll("#List_item li");
  items.forEach((li, index) => {
    const span = li.querySelector("span");
    if (span) {
      const originalText = span.textContent.replace(/^\d+\.\s/, "");
      span.textContent = `${index + 1}. ${originalText}`;
    }
  });
}

function saveList() {
  localStorage.setItem(
    "todoList",
    document.getElementById("List_item").innerHTML
  );
}

function restoreEventListeners() {
  const listItems = document.querySelectorAll("#List_item li");

  listItems.forEach((li) => {
    const span = li.querySelector("span");

    span.addEventListener("dblclick", function () {
      const currentText = span.textContent.replace(/^\d+\.\s/, "");
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = currentText;
      inputField.className = "edit-input";

      li.replaceChild(inputField, span);
      inputField.focus();

      function saveEdit() {
        const newText = inputField.value.trim();
        if (newText !== "") {
          span.textContent = newText;
          li.replaceChild(span, inputField);
          updateListNumbers();
          saveList();
        } else {
          alert("Item cannot be empty.");
          inputField.focus();
        }
      }

      inputField.addEventListener("blur", saveEdit);
      inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });
    });

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveList();
    });

    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (confirm("Delete this item?")) {
        li.remove();
        updateListNumbers();
        saveList();
      }
    });
  });

  updateListNumbers();
}
