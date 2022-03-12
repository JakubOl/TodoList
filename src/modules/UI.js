import Task from "./Task";
import Project from "./Project";
import Store from "./Storage";

import Del from "../icons/delete.png";
import Edit from "../icons/edit.png";

const projectWindow = document.querySelector(".project_window");
export default class UI {
  static currentProject = "";
  static loadPage() {
    UI.displayProjects();
  }
  static initProjectButtons() {
    document
      .querySelector(".add_new_project")
      .addEventListener("click", UI.addProject);
    document
      .querySelector(".cancel_new_project")
      .addEventListener("click", UI.cancelProject);
    document
      .querySelector(".add_project")
      .addEventListener("click", UI.newProject);
    document.querySelectorAll(".project").forEach((project) =>
      project.addEventListener("click", function (e) {
        if (!e.target.classList.contains("delete_project")) {
          UI.currentProject = e.target.parentElement.innerText;
          UI.displayProjectsTasks(UI.currentProject);
          return;
        }
        UI.deleteProject(e.target);
      })
    );
  }
  static addProject() {
    const projectName = document.querySelector("#project_name");
    if (!projectName.value) return;
    Store.addProject(new Project(projectName.value));
    UI.cancelProject();
    UI.clearFields();
    UI.displayProjects();
  }
  static cancelProject() {
    projectWindow.classList.toggle("hidden");
    UI.clearFields();
  }
  static newProject() {
    projectWindow.classList.toggle("hidden");
  }
  static displayProjects() {
    const projectsContainer = document.querySelector(".projects");
    projectsContainer.innerHTML = "";
    Store.getProjects().forEach(function (project) {
      if (project) {
        const projectTemplate = `<div class="project">
        <div class="project_name">${project.name}</div>
        <div class="icons">
          <img src=${Edit} alt="edit" class='edit'>
          <img src=${Del} alt="delete" class='delete'>
        </div>
        </div>`;
        projectsContainer.insertAdjacentHTML("beforeend", projectTemplate);
      }
    }),
      UI.initProjectButtons();
  }
  static deleteProject(name) {
    Store.removeProject(name.parentElement);
    UI.displayProjects();
  }
  static addTask(title, description, date, notes) {}
  static clearFields() {
    document.querySelector("#project_name").value = "";
  }
  static displayProjectsTasks(projectName) {
    document.querySelector(".all_tasks_header").textContent =
      projectName + " tasks:";
  }
}
