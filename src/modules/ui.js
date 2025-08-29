import Project from './projects'; import Todo from './todos';

export default class UI {
  constructor() {
    this.projects = []; const
      defaultProject = new Project("Default"); this.projects.push(defaultProject);
    // delete const todo = new Todo("Test", "test", "22-08-2025", "3");
    // defaultProject.addTodo(todo); this.displayTodos(defaultProject.ID); }

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
      for (const project of this.projects) {
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
          div.id = `${util[0].toLowerCase()}`;
          div.setAttribute('project-id', project.ID);
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
      if (projectID == this.projects[0].ID) {
        alert("Cannot Delete Default Folder");
        return;
      }

      // Delete the project from list of projects
      for (const [idx, project] of this.projects.entries()) {
        if (project.ID == projectID) {
          this.projects.splice(idx, 1);
          break;
        }
      }
      // Remove list item from sidebar
      const projectsList = document.querySelector('.projects-list');
      const projectItems = document.querySelectorAll('.projects > li');
      for (const project of projectItems) {
        if (project.getAttribute('project-id') == projectID) {
          console.log(`Matched${project.getAttribute('project-id')}`)
          projectsList.removeChild(project);
          break;
        }
      }
      this.updateSidebar();
    }

    renameProject(name, projectID){
      for (const project of this.projects) {
        if (project.ID == projectID) project.name = name;
      }
      this.updateSidebar();
    }

    resetTodoForm(){
      const select = document.querySelector('.form-input select');
      const options = document.querySelectorAll('.form-input select option');
      options.forEach((option) => {
        select.removeChild(option);
      });
    }

    updateTodoForm() {
      this.resetTodoForm();
      // Get Project ID of current active project
      const h2 = document.querySelector('.main-content h2');
      const activeProjectID = h2.getAttribute('project-id');
      const select = document.querySelector('.form-input select');
      for (const project of this.projects) {
        const option = document.createElement('option');
        option.textContent = project.name;
        option.value = project.ID;
        if (project.ID == activeProjectID) {
          // Pre-select the active project
          option.selected = true;
        }
        select.appendChild(option);
      }
    }

    createTodo(projID, todo) {
      let selectedProject;
      for (const project of this.projects) {
        if (project.ID == projID) {
          selectedProject = project;
        }
      }
      selectedProject.addTodo(todo);
    }

    clearScreen(){
      const title = document.querySelector('.main-content > h2');
      title.textContent = "";

      const cardsList = document.querySelector('.cards-list');
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        cardsList.removeChild(card);
      })
    }

    displayTodos(projID){
      this.clearScreen();
      let currentProject;
      for (const project of this.projects) {
        if (project.ID == projID) {
          currentProject = project;
          break;
        }
      }
      const h2 = document.querySelector('.main-content h2');
      h2.textContent = `# ${currentProject.name}`;
      // Add data attribute to h2 to hold project ID so that while creating todos current project automatically gets selected in the options.
      h2.setAttribute('project-id', currentProject.ID);

      const cards = document.querySelector('.cards-list');
      for (const todo of currentProject.todos) {
        // Create the todo card and add class and identifier
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('todo-id', todo.ID);

        // Create checkbox container
        const checkbox_container = document.createElement('div');
        checkbox_container.classList.add('checkbox-container');
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "checkbox-input-complete";
        checkbox_container.appendChild(checkbox);

        // Create top row
        const top_row = document.createElement('div');
        top_row.classList.add('top-row');
        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = todo.title;
        const edit_todo_btn = document.createElement('button');
        edit_todo_btn.classList.add('edit-todo-btn');
        const edit_logo = document.createElement('span');
        edit_logo.classList.add('menu-icon', 'material-symbols-outlined');
        edit_logo.textContent = 'edit';
        edit_todo_btn.appendChild(edit_logo)
        const copy_todo_btn = document.createElement('button');
        copy_todo_btn.classList.add('copy-todo-btn');
        const copy_logo = document.createElement('span');
        copy_logo.classList.add('material-symbols-outlined');
        copy_logo.textContent = 'content_copy';
        copy_todo_btn.appendChild(copy_logo)
        top_row.append(title, copy_todo_btn, edit_todo_btn);

        // Create description
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = todo.dscr;

        // Create bottom bar
        const bottom_bar = document.createElement('div');
        bottom_bar.classList.add('bottom-bar');
        const date = document.createElement('div');
        date.classList.add('date');
        const date_icon = document.createElement('span');
        date_icon.classList.add('menu-icon', 'material-symbols-outlined');
        date_icon.textContent = 'calendar_month';
        const p = document.createElement('p');
        p.textContent = todo.dueDate;
        date.append(date_icon, p);
        const priority = document.createElement('div');
        priority.classList.add('priority');
        priority.textContent = todo.priority;
        const priority_icon = document.createElement('span');
        priority_icon.classList.add('menu-icon', 'material-symbols-outlined');
        priority_icon.textContent = 'priority_high';
        priority.appendChild(priority_icon);


        bottom_bar.append(date, priority);

        card.append(checkbox_container, top_row, description, bottom_bar);
        cards.appendChild(card);
      }

    }








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
