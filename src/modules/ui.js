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

    loadProjects(){
        const projectsList = document.querySelector('.projects-list');
        // Display user created projectsList
        for(const project of this.projects){
            // Create a list item for project
            const li = document.createElement('li');
            li.setAttribute('project-id', project.ID);

            // Add hashtag icon  besides project name
            const span = document.createElement('span');
            span.classList.add('menu-icon', 'material-symbols-outlined');
            span.textContent = 'tag';

            // Add project name
            const p = document.createElement('p');
            p.textContent = `${project.name}`;

            // Group icon and name together
            const div = document.createElement('div');
            div.classList.add('to-left');
            div.append(span, p);

            // Add util button
            const dropBtn = document.createElement('button');
            dropBtn.classList.add('drop-btn');
            const utilButtonIcon = document.createElement('span');
            utilButtonIcon.classList.add('material-symbols-outlined');
            utilButtonIcon.textContent = 'more_horiz';
            dropBtn.appendChild(utilButtonIcon);

            // Create the dropdown
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown-content");

            // Create the links
            const utils = [["Rename", "edit"], ["Delete", "delete"]];
            utils.forEach((util) => {
                // Create util logo
                const span = document.createElement('span');
                span.classList.add('material-symbols-outlined');
                span.textContent = util[1];

                // Create util link
                const a = document.createElement("a");
                a.href = "#";
                a.textContent = util[0];

                // Group the logo and link together
                const div = document.createElement('div');
                div.classList.add('util');
                div.append(span, a);

                dropdown.appendChild(div);
            });

            // Append the dropdown to the body (or another container)
        

            li.append(div, dropBtn, dropdown);
            projectsList.appendChild(li);
        }
    }

    updateSidebar(){
        this.resetSidebar();
        this.loadProjects();
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
        this.updateSidebar();
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