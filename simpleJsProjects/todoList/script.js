const inputBox = document.getElementById("textinput");
const list = document.getElementById("list-container");
const button = document.getElementById("addbutton");

button.addEventListener('click', (e)=>{
  if(inputBox.value === ''){
    alert("You must write something!");
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"
    li.appendChild(span)
  }
});

list.addEventListener('click', function(e){ 
  if(e.target.tagname === 'LI'){
    alert("li");
    e.target.classList.toggle("checked");
  }
  else if(e.target.tagname === 'SPAN'){
    alert("span");
    e.target.parentElement.remove();
  }
});