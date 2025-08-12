import './styles.css';
// import Todo from './modules/todos';
// import Project from './modules/projects';
import UI from './modules/ui';
// import { format } from 'date-fns'


const ui = new UI();
ui.updateSidebar();

const addProject = document.querySelector('.add-project-btn');
addProject.addEventListener('click', ()=> {
    ui.createProject('New Project');
    ui.updateSidebar();
});







