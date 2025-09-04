import Todo from "./modules/todos";
import "./styles.css";
// import Project from './modules/projects';
import UI from "./modules/ui";
// import { format } from 'date-fns'

const ui = new UI();
ui.updateSidebar();

const addProject = document.querySelector(".add-project-btn");
addProject.addEventListener("click", () => {
  ui.createProject("New Project");
  ui.updateSidebar();
  // Keep the current project activated
  setProjectAsActive(h2.getAttribute("project-id"));
});

// Event Listeners for sidebar
const projectsList = document.querySelector('.projects-list');
projectsList.addEventListener("click", (e) => {
  // Find the closest ancestor with .util-btn (could be itself)
  const dropBtn = e.target.closest(".drop-btn");
  if (dropBtn) {
    const dropdown = dropBtn.nextElementSibling;
    // Close all dropdowns first
    document.querySelectorAll(".dropdown-content").forEach((d) => {
      if (d !== dropdown) d.style.display = "none";
    });
    if (dropdown && dropdown.classList.contains("dropdown-content")) {
      // Toggle visibility
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    }
    // Prevent the global click handler from closing it immediately
    e.stopPropagation();
  } else {
    // Hide all dropdowns if clicking outside
    document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  }

  const renameBtn = e.target.closest("#rename");
  if (renameBtn) {
    let projectID = renameBtn.getAttribute("project-id");
    const dialog = document.querySelector('#rename-project-dialog');
    const form = document.querySelector("#rename-project-dialog form");
    form.setAttribute('project-id', projectID);
    dialog.showModal();
  }

  const deleteBtn = e.target.closest("#delete");
  if (deleteBtn) {
    let projectID = deleteBtn.getAttribute("project-id");
    ui.deleteProject(projectID);
  }
});

const renameProjectForm = document.querySelector('#rename-project-dialog form');
renameProjectForm.addEventListener('submit', () => {
  const projectID = renameProjectForm.getAttribute('project-id');
  const formData = new FormData(renameProjectForm);
  const newName = formData.get('new-name');
  console.log(newName);
  ui.renameProject(newName, projectID);
  ui.updateSidebar();
});

// Event Listeners for Create Todo
const createTodoDialog = document.querySelector("#create-todo-dialog");
const createTodoBtn = document.querySelector('.create-todo')
createTodoBtn.addEventListener("click", (e) => {
  createTodoDialog.showModal();
  // Dynamically add projects as option to select
  ui.updateTodoForm();
});
const cancelBtn = document.querySelector('#create-todo-dialog input[type="button"]');
cancelBtn.addEventListener('click', ()=> {
  createTodoDialog.close();
});


// Event Listener for create todo form submission
const todoForm = document.querySelector("#create-todo-dialog form");
todoForm.addEventListener("submit", () => {
  const formData = new FormData(todoForm); // this refers to the form element

  const projID = formData.get("project");
  const title = formData.get("title");
  const description = formData.get("description");
  const date = formData.get("date");
  const priority = formData.get("priority");

  const todo = new Todo(title, description, date, priority);

  ui.createTodo(projID, todo);
  setProjectAsActive(projID);
  ui.displayTodos(projID);

  todoForm.reset();
});

// For setting the project as active and adding .active class

const setProjectAsActive = (projID) => {
  let activeProject;
  const items = document.querySelectorAll(".projects-list li");
  for (const item of items) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
    if (item.getAttribute("project-id") == projID) {
      activeProject = item;
    }
  }
  // set active state for selected view
  activeProject.classList.add("active");
};

// Event Listener for Project Views

document.addEventListener("click", (e) => {
  const li = e.target.closest(".projects-list li");
  if (li) {
    const projID = li.getAttribute("project-id");
    setProjectAsActive(projID);
    ui.displayTodos(projID);
  }
});

// For intial activation of Default Project
let h2 = document.querySelector(".main-content h2");
if (h2) {
  // This only works if the page is first rendered at start
  setProjectAsActive(h2.getAttribute("project-id"));
}

