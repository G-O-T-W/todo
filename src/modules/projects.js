import Todo from "./todos";

export default class Project {
  constructor(name) {
    this.ID = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  rename(name) {
    this.name = name;
  }

  copyTodo(todoID) {
    for (const [idx, todo] of this.todos.entries()) {
      if (todoID == todo.ID) {
        let duplicateTodo = new Todo(
          todo.title,
          todo.descr,
          todo.dueDate,
          todo.priority,
        );
        // Insert duplicate todo after the original
        this.todos.splice(idx + 1, 0, duplicateTodo);
        break;
      }
    }
  }

  completeTodo(todoID) {
    for (const [idx, todo] of this.todos.entries()) {
      if (todoID == todo.ID) {
        this.todos.splice(idx, 1);
        break;
      }
    }
  }

  editTodo(todoID, title, dscr, dueDate, priority) {
    let editTodo;
    for(const todo of this.todos){
      if(todo.ID == todoID){
        editTodo = todo;
        break;
      }
    }
    editTodo.title = title;
    editTodo.dscr = dscr;
    editTodo.dueDate = dueDate;
    editTodo.priority = priority;

  }
}
