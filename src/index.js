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

document.addEventListener('click', (e) => {
    // Find the closest ancestor with .util-btn (could be itself)
    const dropBtn = e.target.closest('.drop-btn');
    if (dropBtn) {
        const dropdown = dropBtn.nextElementSibling;
         // Close all dropdowns first
        document.querySelectorAll('.dropdown-content').forEach(d => {
            if (d !== dropdown) d.style.display = 'none';
        });
        if (dropdown && dropdown.classList.contains('dropdown-content')) {
            // Toggle visibility
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
         // Prevent the global click handler from closing it immediately
        e.stopPropagation();
    } else {
         // Hide all dropdowns if clicking outside
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }

    // const util
});







