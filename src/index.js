import './styles.css';
import Todo from './modules/todos';
import Project from './modules/projects';
import UI from './modules/ui';
import { format } from 'date-fns'

let projects = [];

const def = new Project("Default");
projects.push(def);

const menu = document.querySelector('.sidebar > nav');
projects.forEach((project) => {
    const menuItem = document.createElement('button');
    menuItem.textContent = `# ${project.name}`;
    menuItem.setAttribute('project-id', project.ID);
    menu.appendChild(menuItem);
})

const todo1 = new Todo("DSA", "12/08/25", "Complete 5 problems", 1);

def.addTodo(todo1);

def.display();

const ui = new UI();
// ui.clearDisplay();







