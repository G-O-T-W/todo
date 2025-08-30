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

  delete() {
    // delete all todos
    this.todos = [];
    // remove project from the menu
  }

  completeTodo(todoID) {
    for (const [idx, todo] of this.todos.entries()) {
      if (todoID == todo.ID) {
        this.todos.splice(idx, 1);
      }
    }
  }
}
