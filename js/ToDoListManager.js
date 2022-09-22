class ToDoListManager {
   constructor() {
      this.toDoList = [];
   }

   getToDoList() {
      return this.toDoList;
   }

   setToDoList(arrToDo) {
      this.toDoList = arrToDo;
   }

   addToDo(toDo) {
      this.toDoList.push(toDo);
   }

   deleteToDo(id) {
      this.toDoList.splice(id, 1);
   }

   findTodoById(id) {
      return this.toDoList.find((item) => {
         return item === this.toDoList[id];
      });
   }

   sortAZ() {
      this.toDoList.sort(function (a, b) {
         return a.content > b.content ? 1 : b.content > a.content ? -1 : 0;
      });
   }

   sortZA() {
      this.toDoList.sort(function (a, b) {
         return a.content > b.content ? -1 : b.content > a.content ? 1 : 0;
      });
   }
}

export default ToDoListManager;
