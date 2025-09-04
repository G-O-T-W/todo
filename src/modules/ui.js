import Project from "./projects";
import Todo from "./todos";

export default class UI {
  constructor() {
    this.projects = [];
    const defaultProject = new Project("Default");
    this.projects.push(defaultProject);
    // delete
    const todo = new Todo("Test", "test", "22-08-2025", "3");
    defaultProject.addTodo(todo);
    this.displayTodos(defaultProject.ID);

  }

  createProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
  }

  resetSidebar() {
    const projectsList = document.querySelector(".projects-list");
    const projectItems = document.querySelectorAll(".projects-list > li");
    projectItems.forEach((project) => {
      projectsList.removeChild(project);
    });
  }

  loadProjects() {
    const projectsList = document.querySelector(".projects-list");
    // Display user created projectsList
    for (const project of this.projects) {
      // Create a list item for project
      const li = document.createElement("li");
      li.setAttribute("project-id", project.ID);

      // Add hashtag icon  besides project name
      const span = document.createElement("span");
      span.classList.add("menu-icon", "material-symbols-outlined");
      span.textContent = "tag";

      // Add project name
      const p = document.createElement("p");
      p.textContent = `${project.name}`;

      // Group icon and name together
      const div = document.createElement("div");
      div.classList.add("to-left");
      div.append(span, p);

      // Add util button
      const dropBtn = document.createElement("button");
      dropBtn.classList.add("drop-btn");
      const utilButtonIcon = document.createElement("span");
      utilButtonIcon.classList.add("material-symbols-outlined");
      utilButtonIcon.textContent = "more_horiz";
      dropBtn.appendChild(utilButtonIcon);

      // Create the dropdown
      const dropdown = document.createElement("div");
      dropdown.classList.add("dropdown-content");

      // Create the links
      const utils = [
        ["Rename", "edit"],
        ["Delete", "delete"],
      ];
      utils.forEach((util) => {
        // Create util logo
        const span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.textContent = util[1];

        // Create util link
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = util[0];

        // Group the logo and link together
        const div = document.createElement("div");
        div.classList.add("util");
        div.id = `${util[0].toLowerCase()}`;
        div.setAttribute("project-id", project.ID);
        div.append(span, a);

        dropdown.appendChild(div);
      });

      // Append the dropdown to the body (or another container)

      li.append(div, dropBtn, dropdown);
      projectsList.appendChild(li);
    }
  }

  updateSidebar() {
    this.resetSidebar();
    this.loadProjects();
  }

  deleteProject(projectID) {
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
    const projectsList = document.querySelector(".projects-list");
    const projectItems = document.querySelectorAll(".projects > li");
    for (const project of projectItems) {
      if (project.getAttribute("project-id") == projectID) {
        console.log(`Matched${project.getAttribute("project-id")}`);
        projectsList.removeChild(project);
        break;
      }
    }
    this.updateSidebar();
  }

  renameProject(name, projectID) {
    for (const project of this.projects) {
      if (project.ID == projectID) project.name = name;
    }
    this.updateSidebar();
  }

  resetTodoForm() {
    const select = document.querySelector(".form-input select");
    const options = document.querySelectorAll(".form-input select option");
    options.forEach((option) => {
      select.removeChild(option);
    });
  }

  updateTodoForm() {
    this.resetTodoForm();
    // Get Project ID of current active project
    const h2 = document.querySelector(".main-content h2");
    const activeProjectID = h2.getAttribute("project-id");
    const select = document.querySelector(".form-input select");
    for (const project of this.projects) {
      const option = document.createElement("option");
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

  clearScreen() {
    // const title = document.querySelector(".main-content > h2");
    // title.textContent = "";
    //
    // const cardsList = document.querySelector(".cards-list");
    // const cards = document.querySelectorAll(".card");
    // cards.forEach((card) => {
    //   cardsList.removeChild(card);
    // });
    const cards = document.querySelector(".cards-list");
    cards.innerHTML = "";
  }

  displayTodos(projID) {
    this.clearScreen();
    let currentProject;
    for (const project of this.projects) {
      if (project.ID == projID) {
        currentProject = project;
        break;
      }
    }

    const h2 = document.querySelector(".main-content h2");
    h2.textContent = `# ${currentProject.name}`;
    // Add data attribute to h2 to hold project ID so that while creating todos current project automatically gets selected in the options.
    h2.setAttribute("project-id", currentProject.ID);
    const cards = document.querySelector(".cards-list");
    currentProject.todos.forEach((todo) => {
      // Create the todo card and add class and identifier
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("todo-id", todo.ID);
      card.setAttribute("project-id", currentProject.ID);

      // Create checkbox container
      const checkbox_container = document.createElement("div");
      checkbox_container.classList.add("checkbox-container");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "checkbox-input-complete";
      checkbox.addEventListener("click", this.handleCheckboxClick);
      checkbox_container.appendChild(checkbox);

      // Create top row
      const top_row = document.createElement("div");
      top_row.classList.add("top-row");
      // title
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = todo.title;
      // Edit todo btn
      const edit_todo_btn = document.createElement("button");
      edit_todo_btn.classList.add("edit-todo-btn");
      const edit_logo = document.createElement("span");
      edit_logo.classList.add("menu-icon", "material-symbols-outlined");
      edit_logo.textContent = "edit";
      edit_todo_btn.appendChild(edit_logo);
      edit_todo_btn.addEventListener("click", this.handleEditClick);
      // Copy Todo btn
      const copy_todo_btn = document.createElement("button");
      copy_todo_btn.classList.add("copy-todo-btn");
      const copy_logo = document.createElement("span");
      copy_logo.classList.add("material-symbols-outlined");
      copy_logo.textContent = "content_copy";
      copy_todo_btn.appendChild(copy_logo);
      copy_todo_btn.addEventListener("click", this.handleCopyClick);
      top_row.append(title, copy_todo_btn, edit_todo_btn);

      // Create description
      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = todo.dscr;

      // Create bottom bar
      const bottom_bar = document.createElement("div");
      bottom_bar.classList.add("bottom-bar");
      const date = document.createElement("div");
      date.classList.add("date");
      const date_icon = document.createElement("span");
      date_icon.classList.add("menu-icon", "material-symbols-outlined");
      date_icon.textContent = "calendar_month";
      const p = document.createElement("p");
      p.textContent = todo.dueDate;
      date.append(date_icon, p);
      const priority = document.createElement("div");
      priority.classList.add("priority");
      priority.textContent = todo.priority;
      const priority_icon = document.createElement("span");
      priority_icon.classList.add("menu-icon", "material-symbols-outlined");
      priority_icon.textContent = "priority_high";
      priority.appendChild(priority_icon);

      bottom_bar.append(date, priority);

      card.append(checkbox_container, top_row, description, bottom_bar);
      cards.appendChild(card);
    });
  }

  // Use arrow function so that `this` always refers to the class instance.
  // This removes the need to bind in the constructor.
  handleCopyClick = (e) => {
    const card = e.target.closest(".card");
    const todoID = card.getAttribute("todo-id");
    const projectID = card.getAttribute("project-id");
    this.copyTodoOnScreen(todoID, projectID);
  };

  handleEditClick = (e) => {
    const card = e.target.closest(".card");
    const todoID = card.getAttribute("todo-id");
    const projectID = card.getAttribute("project-id");
    let currentProject;
    for(const project of this.projects){
      if(project.ID == projectID) {
        currentProject = project;
        break;
      }
    }
    // Get the right todo
    let currentTodo;
    for(const todo of currentProject.todos){
      if(todo.ID == todoID) {
        currentTodo = todo;
        break;
      }
    }

    const editTodoDialog = document.querySelector("#edit-todo-dialog");

    // Set placeholders on screen
    const title = document.querySelector("#edit-todo-dialog #title");
    title.value = `${currentTodo.title}`;

    const description = document.querySelector("#edit-todo-dialog #description");
    description.value = currentTodo.dscr === undefined ? "" : `${currentTodo.dscr}`;

    const date = document.querySelector("#edit-todo-dialog #date");
    date.value = `${currentTodo.dueDate}`;

    const priority = document.querySelector("#edit-todo-dialog #priority");
    priority.value = `${currentTodo.priority}`;

    // Add Event Listener
    const cancelBtn = document.querySelector("#edit-todo-dialog input[type='button']");
    cancelBtn.addEventListener('click', () => {
      editTodoDialog.close();
    });

    const editForm = document.querySelector("#edit-todo-dialog form");
    editForm.addEventListener('submit', (e) => {
      const formData = new FormData(editForm);
      const title = formData.get("title");
      const description = formData.get("description");
      const date = formData.get("date");
      const priority = formData.get("priority");
      currentProject.editTodo(currentTodo.ID, title, description, date, priority);
      this.displayTodos(currentProject.ID);
    });

    // Show Modal
    editTodoDialog.showModal();
    editTodoDialog.setAttribute('todo-id', todoID);
    editTodoDialog.setAttribute('project-id', projectID);
    
  };

  handleCheckboxClick = (e) => {
    const card = e.target.closest(".card");
    const todoID = card.getAttribute("todo-id");
    const projectID = card.getAttribute("project-id");
    //  HACK: Using setTimeout to let the CSS :checked animation play
    // before the DOM is updated or the element is removed.
    // Without this delay, the checkbox visual effect wouldn't appear
    // because the element is removed immediately.
    // card.classList.add("removing");
    // setTimeout(() => {
    //   this.clearTodoOnScreen(todoID, projectID);
    //   card.remove();
    // }, 500);

    // This is the more robust approach
    // 1. Update the state
    this.clearTodoOnScreen(todoID, projectID);

    // 2. Trigger CSS animation
    card.classList.add("removing"); // e.g., opacity/translate transition

    // 3. Remove DOM element after transition ends
    card.addEventListener(
      "transitionend",
      () => {
        card.remove();
      },
      { once: true }, // ensures listener fires only once
    );
  };

  clearTodoOnScreen(todoID, projID) {
    for (const project of this.projects) {
      if (project.ID == projID) {
        project.completeTodo(todoID);
        break;
      }
    }
  }

  copyTodoOnScreen(todoID, projID) {
    for (const project of this.projects) {
      if (project.ID == projID) {
        project.copyTodo(todoID);
        break;
      }
    }
    this.displayTodos(projID);
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
