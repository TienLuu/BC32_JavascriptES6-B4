import ToDo from "./ToDo.js";
import ToDoListManager from "./ToDoListManager.js";

const toDoListManager = new ToDoListManager();
const toDoListCompleted = [];

//===========================================
//              INITIALIZATION
//===========================================

function rendertoDoList(toDoList, selector) {
   let html = toDoList
      .map((item, index) => {
         return `
           <li>
                <span>${item.content}</span>
                <div class="buttons">
                    <button >
                        <i class="fa-regular fa-trash-can remove" data-type="remove" data-id="${index}"></i>
                    </button>
                    <button >
                        <i class="fa-solid fa-circle-check complete" data-type="complete" data-id="${index}"></i>
                    </button>
                </div>
            </li>
        `;
      })
      .join("");

   if (!html) html = ``;
   dom(selector).innerHTML = html;
}

function addToDo() {
   const inputVal = dom("#newTask").value;
   if (!inputVal) return;

   const toDo = new ToDo(inputVal);
   toDoListManager.setToDoList(toDo);

   dom("#newTask").value = "";
}

function remove(id) {
   toDoListManager.deleteToDo(id);
}

function complete(id) {
   const newToDo = toDoListManager.findTodoById(id);

   toDoListCompleted.push(newToDo);
   toDoListManager.deleteToDo(id);

   rendertoDoList(toDoListCompleted, "#completed");
}

function sortAZ() {
   console.log("a-z");
   toDoListManager.sortAZ();
}

function sortZA() {
   console.log("z-a");
}

// OBJECT TYPE TO INVOKE FUNCTION
const objectType = {
   remove,
   complete,
   addToDo,
   sortAZ,
   sortZA,
};

function getDataType(dataType, dataId) {
   return objectType[dataType](dataId);
}

//===========================================
//              HANDLE EVENT
//===========================================

// Sự kiện thêm, xoá và checked
document.addEventListener("click", (e) => {
   const element = e.target.closest("[data-type]");
   if (!element) return;

   const actionType = element.dataset.type;
   const id = element.dataset.id;

   getDataType(actionType, id);

   rendertoDoList(toDoListManager.getToDoList(), "#todo");
});

//===========================================
//              HELPER FUNCTION
//===========================================

function dom(selector) {
   return document.querySelector(selector);
}
