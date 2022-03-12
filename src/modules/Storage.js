export default class Store {
  static getProjects() {
    let projects;
    if (localStorage.getItem("projects") === null) {
      projects = [];
    } else {
      projects = Array.from(JSON.parse(localStorage.getItem("projects")));
    }
    return projects;
  }

  static addProject(project) {
    const projects = Store.getProjects();
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static removeProject(name) {
    const projects = Store.getProjects();
    localStorage.setItem(
      "projects",
      JSON.stringify(
        projects.filter((project) => project.name !== name.innerText)
      )
    );
    console.log(projects);
  }
  static editProject(name, newName) {
    const projects = Store.getProjects();
    localStorage.setItem(
      "projects",
      JSON.stringify(
        projects.map((project) =>
          project.name === name.innerText
            ? (project.name = newName)
            : project.name
        )
      )
    );
  }
  static clearProjectsContainer() {
    const projects = [];
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}
