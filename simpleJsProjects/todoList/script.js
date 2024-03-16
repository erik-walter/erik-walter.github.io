const inputBox = document.getElementById("textinput");
const list = document.getElementById("list-container");
const button = document.getElementById("addbutton");

button.addEventListener("click", (e) => {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  saveData();
});

list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

function showTask() {
  list.innerHTML = localStorage.getItem("data");
}

showTask();
