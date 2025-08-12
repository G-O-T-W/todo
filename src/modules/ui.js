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
        const projectsList = document.querySelector('.projects-list');
        const projectItems = document.querySelectorAll('.projects-list > li');
        projectItems.forEach((project) => {
           projectsList.removeChild(project);
        });
        
    }

    updateSidebar(){
        this.resetSidebar()
        const projectsList = document.querySelector('.projects-list');
        // Display user created projectsList
        for(const project of this.projects){
            const li = document.createElement('li');
            li.setAttribute('project-id', project.ID);
            // Add hashtag icon dynamically besides projectsList
            const span = document.createElement('span');
            span.classList.add('menu-icon', 'material-symbols-outlined');
            span.textContent = 'tag';
            const button = document.createElement('button');
            button.textContent = `${project.name}`;
            li.append(span, button);
            projectsList.appendChild(li);
        }
    }

    deleteProject(projectID){

        // Delete the project from list of projects
        for(const [idx, project] of this.projects.entries()){
            if(project.ID = projectID){
                this.projects.splice(idx, 1)
                break;
            }
        }
        // Remove list item from sidebar
        const projects = document.querySelector('.projects-list');
        const projectItems = document.querySelectorAll('.projects > li');
        for(const project of projectItems){
            if(project.getAttribute('project-id') == projectID){
                projects.removeChild(project);
                break;
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