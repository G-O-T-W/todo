import Project from './projects';
import Todo from './todos';

export default class Storage {
  constructor() {
    if (!localStorage.getItem('projects')) {
      const defaultProject = new Project('Default');
      const todo = new Todo('Test', 'test', '2025-08-22', '3');
      defaultProject.addTodo(todo);
      // const obj = JSON.stringify(defaultProject, function replacer(key, value){
      //     return (typeof value === 'function')? value.toString() : value;
      // });
      localStorage.setItem('projects', JSON.stringify([defaultProject]));
    }
  }

  update(projects) {
    localStorage.removeItem('projects');
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  load() {
    let projects = localStorage.getItem('projects');
    projects = JSON.parse(projects);
    const projectInstance = new Project();
    projects.forEach((project) => {
      Object.setPrototypeOf(project, projectInstance);
    });
    return projects;
  }
}
