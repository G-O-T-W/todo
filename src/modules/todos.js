export default class Todo {
    constructor(title, dscr, dueDate, priority){
        this.ID = crypto.randomUUID();
        this.title = title;
        this.dscr = dscr;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
    }

    complete(){
        // delete the todo from the project
        this.title = "[Completed] " + title;
        // isComplete = true;
    }

    edit(title, dueDate=null, dscr=null, priority=null){
        this.title = title;
        if(dueDate) this.dueDate = dueDate;
        if(dscr) this.dscr = dscr;
        if(priority) this.priority = priority;
    }

    copy(){

    }
}