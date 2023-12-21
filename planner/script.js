function openDay(evt, dayName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(dayName).style.display = "block";
    evt.currentTarget.className += " active";
}

// function changeColor(color) {
//     let elem = document.getElementById('square');
//     elem.style.backgroundColor = color;

// }

let todoList, dayName, ulSpace;

// Add a new item to the to-do list
function newElement(dayName, inputSpace, ulSpace) {
  let inputValue = document.getElementById(inputSpace).value;
  if (inputValue === '') {
    alert("You must write something!");
    return;
  }
  // Add the new item to the array and save the updated list
  todoList.push(inputValue);
  saveTodoList(dayName);
  // Display the updated list
  displayTodoList(dayName, ulSpace);
  document.getElementById(inputSpace).value = "";
}

// Save the to-do list to local storage
function saveTodoList(dayName) {
  localStorage.setItem(dayName, JSON.stringify(todoList));
}

// Display the to-do list
function displayTodoList(dayName, ulSpace) {

  todoList = JSON.parse(localStorage.getItem(dayName)) || [];
  let ul = document.getElementById(ulSpace);
  ul.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    let li = document.createElement("li");
    let inputValue = todoList[i];
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    ul.appendChild(li);

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    li.addEventListener('click', function (ev) {
      ev.target.classList.toggle('checked');
    });

    // Add click event to remove item and save state
    span.addEventListener('click', function (ev) {
      let item = ev.target.parentElement.innerText;
      let index = todoList.indexOf(item);
      todoList.splice(index, 1);
      saveTodoList(dayName);
      ev.target.parentElement.style.display = "none";
    }, false);
  }
}

// Load the to-do list on page load
displayTodoList(dayName, ulSpace);
