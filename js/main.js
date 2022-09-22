import ToDo from "./ToDo.js";
import ToDoListManager from "./ToDoListManager.js";

const toDoListManager = new ToDoListManager();
let toDoListCompleted = [];
const TODO_KEY = "ToDoList";
const TODOCOMPLETED_KEY = "ToDoListCompleted";

//===========================================
//              INITIALIZATION
//===========================================
function renderList(list, selector) {
   let html = list
      .map((item, index) => {
         return `
           <li>
                <span>${item.content}</span>
                <div class="buttons">
                    <button class="remove">
                        <i class="fa-regular fa-trash-can"  data-type="remove" data-id="${index}"></i>
                    </button>
                    <button class="complete" data-type="complete" data-id="${index}">
                        <i class="fa-solid fa-circle-check"  ></i>
                    </button>
                </div>
            </li>
        `;
      })
      .join("");

   if (!html) html = ``;
   dom(selector).innerHTML = html;
}

function initial() {
   const toDoList = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
   toDoListManager.setToDoList(toDoList);

   toDoListCompleted =
      JSON.parse(localStorage.getItem(TODOCOMPLETED_KEY)) || [];

   renderList(toDoListManager.getToDoList(), "#todo");
   renderList(toDoListCompleted, "#completed");
}

//===========================================
//              FUNCTIONALLY
//===========================================
function addToDo(inputVal) {
   const toDo = new ToDo(inputVal);
   toDoListManager.addToDo(toDo);
}

function removeTodo(id) {
   toDoListManager.deleteToDo(id);
}

function removeTodoCompleted(id) {
   toDoListCompleted.splice(id, 1);
}

function complete(id) {
   const newToDo = toDoListManager.findTodoById(id);

   toDoListCompleted.push(newToDo);
   toDoListManager.deleteToDo(id);
}

function sortAZ() {
   toDoListManager.sortAZ();
}

function sortZA() {
   toDoListManager.sortZA();
}

// OBJECT TYPE TO INVOKE FUNCTION
const objectTypeToDos = {
   remove: removeTodo,
   complete,
};

const objectTypeToDoComplete = {
   remove: removeTodoCompleted,
};

const objectSort = {
   sortAZ,
   sortZA,
};

function getDataType(dataType, dataId, check = true) {
   if (!check) return objectTypeToDoComplete[dataType](dataId);
   return objectTypeToDos[dataType](dataId);
}

function getSort(dataType) {
   return objectSort[dataType]();
}

//===========================================
//              HANDLE EVENT
//===========================================
// Khởi tạo
initial();

// Lắng nghe sự kiện thêm todo
dom("#addItem").addEventListener("click", () => {
   const inputVal = dom("#newTask").value;
   if (!inputVal) return;

   addToDo(inputVal);

   renderList(toDoListManager.getToDoList(), "#todo");
   dom("#newTask").value = "";

   localStorage.setItem(
      TODO_KEY,
      JSON.stringify(toDoListManager.getToDoList())
   );
});

// Lắng nghe sự kiện xoá và check vào các việc đã làm xong
dom("#todo").addEventListener("click", (e) => {
   const element = e.target.closest("[data-type]");
   if (!element) return;

   const actionType = element.dataset.type;
   const id = element.dataset.id;

   getDataType(actionType, id);

   if (actionType === "complete") {
      renderList(toDoListCompleted, "#completed");
      localStorage.setItem(
         TODOCOMPLETED_KEY,
         JSON.stringify(toDoListCompleted)
      );
   }

   renderList(toDoListManager.getToDoList(), "#todo");
   localStorage.setItem(
      TODO_KEY,
      JSON.stringify(toDoListManager.getToDoList())
   );
});

// Lắng nghe sự kiện xoá ở các việc đã hoàn thành
dom("#completed").addEventListener("click", (e) => {
   const element = e.target.closest("[data-type]");
   if (!element) return;

   const actionType = element.dataset.type;
   const id = element.dataset.id;

   if (actionType !== "remove") return;

   getDataType(actionType, id, null);
   renderList(toDoListCompleted, "#completed");

   localStorage.setItem(TODOCOMPLETED_KEY, JSON.stringify(toDoListCompleted));
});

// Lắng nghe sự kiện sắp xếp
dom(".filter-btn").addEventListener("click", (e) => {
   e.preventDefault();
   const element = e.target.closest("[data-filter-type]");
   if (!element) return;

   const actionType = element.dataset.filterType;

   getSort(actionType);
   renderList(toDoListManager.getToDoList(), "#todo");
});

//===========================================
//              HELPER FUNCTION
//===========================================
function dom(selector) {
   return document.querySelector(selector);
}
