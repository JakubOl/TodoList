import Project from "./Project";
import Task from "./Task";

export default class Store {
  static getProjects() {
    let projects;
    if (!localStorage.getItem("projects")) {
      projects = [];
    } else if (localStorage.getItem("projects")) {
      projects = Array.from(
        JSON.parse(localStorage.getItem("projects"))
      ).filter((value) => value !== null);
    }
    return projects;
  }
  static getProject(projectName) {
    return Store.getProjects().filter(function (project) {
      return project.name === projectName;
    })[0];
  }

  static addProject(project) {
    const projects = Store.getProjects();
    projects.push(new Project(project));
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static removeProject(removed) {
    const projects = Store.getProjects();
    localStorage.setItem(
      "projects",
      JSON.stringify(
        projects.filter(function (project) {
          return project.name !== removed;
        })
      )
    );
  }
  static editProject(oldName, newName) {
    const projects = Store.getProjects();
    projects.map(function (item) {
      if (item.name === oldName) item.name = newName;
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static addTask(projectName, taskData) {
    const projects = Store.getProjects();
    projects.map(function (item) {
      if (item.name === projectName) {
        item.tasks.push(
          new Task(
            taskData.title,
            taskData.description,
            taskData.date,
            taskData.notes,
            taskData.done
          )
        );
      }
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static deleteTask(projectName, taskName) {
    const projects = Store.getProjects();
    projects.map(function (project) {
      if (project.name === projectName)
        return (project.tasks = project.tasks.filter(
          (task) => task.title !== taskName
        ));
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static editTask(projectName, taskName, taskData) {
    const projects = Store.getProjects();
    projects.map((project) => {
      if (project.name !== projectName) return;
      project.tasks = project.tasks.map((task) => {
        if (task.title === taskName) {
          task.title = taskData.title;
          task.desc = taskData.description;
          task.date = taskData.date;
          task.notes = taskData.notes;
          task.done = taskData.done;
          return task;
        } else return task;
      });
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static getTask(projectName, taskName) {
    const projects = Store.getProjects();
    return projects
      .filter((project) => project.name === projectName)[0]
      .tasks.filter((task) => task.title === taskName)[0];
  }
}
