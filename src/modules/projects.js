export default class Project{
    constructor(name){
        this.ID = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }
    
    addTodo(todo){
        this.todos.push(todo);
    }

    rename(name){
        this.name = name;
    }

    delete(){
        // delete all todos
        this.todos = [];
        // remove project from the menu
    }

    display(){
        console.log("hi");
        for(const todo of this.todos){
            console.log(todo);
        }
    }
}