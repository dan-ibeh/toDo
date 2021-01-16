input = document.querySelector(".task");
enter = document.querySelector(".enter");
list = document.querySelector(".list");
del = document.querySelectorAll(".trash");
edit = document.querySelectorAll(".edit");
container = document.querySelector(".container");

fullList = JSON.parse(localStorage.getItem("fullList")) || [];
input.focus();
clearList = () => {
  list.innerHTML = "";
};

loadList = (i) => {
  clearList();
  i.forEach((itemObj) => {
    addTask(itemObj);
  });
};

loadList(fullList);

storeItem = (input) => {
  fullList.push(input.value);
  localStorage.setItem("fullList", JSON.stringify(fullList));
};

deleteItem = (item) => {
  c_list= document.querySelectorAll("li");
  for (let i=0; i<c_list.length;i++) {
    if (c_list[i] == item) {
      fullList.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("fullList", JSON.stringify(fullList));
  return fullList
};

retrieve = () => {
  a_list = localStorage.getItem("fullList");
  f_List = JSON.parse(a_list);
    loadList(f_List)  
};

//Add event listeners
enter.addEventListener("click", function (event) {
  if (input.value.trim().length > 0) {
    event.preventDefault();
    storeItem(input);
    clearList();
    retrieve();
  }
  input.focus();
});

input.addEventListener("keydown", function (event) {
  if (input.value.length > 0 && event.which === 13) {
    event.preventDefault();
    storeItem(input);
    clearList();
    retrieve();
  }
  input.focus();
});

//Functions
function addTask(itemObj) {
  //New List element
  li = document.createElement("li");
  list.appendChild(li);
  //New paragraphelement
  p = document.createElement("p");
  li.appendChild(p);
  p.appendChild(document.createTextNode(itemObj));
  //New edit button;
  edit = document.createElement("button");
  edit.className = "edit";
  edit.addEventListener("click", editTask);
  faEdit = document.createElement("i");
  faEdit.className = "fas fa-edit";
  edit.appendChild(faEdit);
  li.appendChild(edit);
  //New delete button;
  del = document.createElement("button");
  del.className = "trash;";
  faDel = document.createElement("i");
  faDel.className = "fas fa-trash";
  faDel.addEventListener("click", delTask);
  del.appendChild(faDel);
  li.appendChild(del);
  input.value = "";
}

function delTask(event) {
  if (confirm("Deleting will permanently remove this task from this list. Do you want to continue?")) {
    li = event.target.parentElement.parentElement;
    deleteItem(li);
    a_list = localStorage.getItem("fullList");
    fullList= JSON.parse(a_list);
    list.removeChild(li);
  }
}

function editTask(event) {
  li = event.target.parentElement.parentElement;
  input.value = li.firstElementChild.textContent;
  deleteItem(li);
  list.removeChild(li);
  input.focus();
}
