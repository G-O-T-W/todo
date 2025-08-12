import Project from './projects';

export default class UI{
    constructor(){
        this.projects = [];
        const defaultProject = new Project("Default");
        this.projects.push(defaultProject);
    }

    createProject(name){
        const newProject = new Project(name);
        this.projects.push(newProject);
    }

    resetSidebar(){
        const menu = document.querySelector('.sidebar > nav > ul');
        const menuItems = document.querySelectorAll('.sidebar > nav > ul > li');
        menuItems.forEach((menuItem, index) => {
            // Exclude the four static projects Inbox, Today, Upcoming, Overdue
            if(index >= 4) menu.removeChild(menuItem);
        });
        
    }

    updateSidebar(){
        this.resetSidebar()
        const menu = document.querySelector('.sidebar > nav > ul');
        // Display user created projects
        for(const project of this.projects){
            const menuItem = document.createElement('li');
            menuItem.setAttribute('project-id', project.ID);
            // Add hashtag icon dynamically besides projects
            const span = document.createElement('span');
            span.classList.add('menu-icon', 'material-symbols-outlined');
            span.textContent = 'tag';
            const button = document.createElement('button');
            button.textContent = `${project.name}`;
            menuItem.append(span, button);
            menu.appendChild(menuItem);
        }
    }

    deleteProject(projectID){
        const menu = document.querySelector('.sidebar > nav > ul');
        for(const project of projects){
            if(project.ID == projectID){
                project.todos = [];

            }
        }

    }

    renameProject(name, projectID){
        for(const project of this.projects){
            if(project.ID == projectID) project.name = name;
        }
        this.updateSidebar();
    }

    




    // clearTodos(){
    //     const title = document.querySelector('.main-content > h1');
    //     title.textContent = "";

    //     const cardsList = document.querySelector('.cards-list');
    //     const cards = document.querySelectorAll('.card');
    //     cards.forEach((card) => {
    //         cardsList.removeChild(card);
    //     })
    // }

    // display(project){
    //     this.clearDisplay();
    //     const title = document.querySelector('.main-content > h1');
    //     title.textContent = project.name;

    //     project.todos.forEach((todo) => {
    //         const card = document.createElement('.div');
    //         card.classList.add('card');
            
    //     })
    // }
}