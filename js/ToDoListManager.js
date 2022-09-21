class ToDoListManager {
   constructor() {
      this.toDoList = [];
   }

   getToDoList() {
      return this.toDoList;
   }

   setToDoList(toDo) {
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
      //   const result = this.toDoList.sort((a, b) => {
      //      console.log("a", a.content);
      //      console.log("b", b.content);
      //   });
      //   console.log(this.toDoList);
      //   console.log(result);
   }

   sortZA() {}
}

export default ToDoListManager;
