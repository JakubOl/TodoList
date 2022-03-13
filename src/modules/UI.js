import Store from "./Storage";
import Del from "../icons/delete.png";
import Edit from "../icons/edit.png";

export default class UI {
  static currentProject = "";
  static loadPage() {
    UI.initProjectButtons();
    UI.displayProjects();
  }
  static initProjectButtons() {
    document.addEventListener("click", function (e) {
      e.preventDefault();
    });
    document
      .querySelector(".add_new_project")
      .addEventListener("click", UI.addProject);
    document
      .querySelector(".cancel_new_project")
      .addEventListener("click", UI.toggleProjectWindow);
    document
      .querySelector(".add_project")
      .addEventListener("click", UI.toggleProjectWindow);

    // Add task
    document
      .querySelector(".add_task_btn")
      .addEventListener("click", UI.toggleTaskWindow);
    document.querySelector(".add_task").addEventListener("click", function () {
      UI.newTask();
      UI.displayProjectsTasks();
      UI.toggleTaskWindow();
    });
    document
      .querySelector(".cancel_task")
      .addEventListener("click", function () {
        UI.toggleTaskWindow();
      });
  }
  static addProjectAndTaskButtons() {
    let editedProjectName;
    document.querySelectorAll(".project_name").forEach((project) =>
      project.addEventListener("click", function (e) {
        UI.currentProject = e.target.innerText;
        UI.displayProjectsTasks();
      })
    );
    document.querySelectorAll(".delete_project").forEach((btn) =>
      btn.addEventListener("click", function (e) {
        UI.deleteProject(
          e.target.parentElement.parentElement.firstElementChild.textContent
        );
      })
    );
    document.querySelectorAll(".edit_project").forEach((btn) =>
      btn.addEventListener("click", function (e) {
        console.log(
          e.target.parentElement.parentElement.firstElementChild.textContent
        );
        UI.editProject(
          e.target.parentElement.parentElement.firstElementChild.innerText
        );
        editedProjectName =
          e.target.parentElement.parentElement.firstElementChild.textContent;
      })
    );
    //Edit project
    document
      .querySelector(".submit_edit_project")
      .addEventListener("click", function () {
        Store.editProject(
          editedProjectName,
          document.querySelector("#project_name_edit").value
        );
        UI.toggleEditWindow();
        UI.displayProjects();
      });
    document
      .querySelector(".submit_edit_project")
      .addEventListener("click", UI.toggleEditWindow);
    document
      .querySelector(".cancel_edit_project")
      .removeEventListener("click", UI.toggleEditWindow);
    document
      .querySelector(".cancel_edit_project")
      .addEventListener("click", UI.toggleEditWindow);

    //Delete task
    document.querySelectorAll(".task").forEach((task) => {
      task.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit_task")) {
          Store.editTask(
            UI.currentProject,
            e.target.parentElement.parentElement.firstElementChild.textContent
          );
          UI.displayProjects();
        } else if (e.target.classList.contains("delete_task")) {
          Store.deleteTask(
            UI.currentProject,
            e.target.parentElement.parentElement.firstElementChild.textContent
          );
          UI.displayProjectsTasks();
        }
      });
    });
  }
  static addProject() {
    const projectName = document.querySelector("#project_name");
    if (!projectName.value) return;
    Store.addProject(projectName.value);
    UI.toggleProjectWindow();
    UI.clearFields();
    UI.displayProjects();
  }

  static toggleProjectWindow() {
    UI.clearFields();
    document.querySelector(".project_window").classList.toggle("hidden");
  }
  static toggleTaskWindow() {
    document.querySelector(".task_window").classList.toggle("hidden");
  }
  static toggleEditWindow() {
    document.querySelector(".edit_window").classList.toggle("hidden");
  }
  static displayProjects() {
    const projectsContainer = document.querySelector(".projects");
    projectsContainer.innerHTML = "";
    Store.getProjects().forEach(function (project) {
      if (project) {
        const projectTemplate = `<div class="project">
        <div class='project_name'>${project.name}</div>
        <div class="icons">
          <img src=${Edit} alt="edit" class='edit_project'>
          <img src=${Del} alt="delete" class='delete_project'>
        </div>
        </div>`;
        projectsContainer.insertAdjacentHTML("beforeend", projectTemplate);
      }
    });
    UI.addProjectAndTaskButtons();
  }
  static deleteProject(name) {
    Store.removeProject(name);
    UI.displayProjects();
  }
  static editProject(oldName) {
    UI.toggleEditWindow();
    document.querySelector("#project_name_edit").value = oldName;
  }
  static getTaskData() {
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const date = document.querySelector("#date").value;
    const notes = document.querySelector("#notes").value;
    return { title, description, date, notes };
  }
  static newTask() {
    if (!UI.currentProject) return;
    Store.addTask(UI.currentProject, UI.getTaskData());
  }
  static clearFields() {
    document.querySelector("#project_name").value = "";
  }
  static displayProjectsTasks() {
    document.querySelector(".tasks_container").innerHTML = "";
    if (
      UI.currentProject === "" ||
      Store.getProject(UI.currentProject).tasks === []
    )
      return;
    document.querySelector(".all_tasks_header").textContent =
      UI.currentProject + " tasks:";
    Store.getProject(UI.currentProject).tasks.forEach(function (task) {
      const taskTemplate = `
      <div class="task">
      <div class='task_name'>${task.title}</div>
      <div class='task_desc'>${task.description}</div>
      <div class='task_date'>${task.date}</div>
      <div class='task_notes'>${task.notes}</div>
      <div class="task_icons">
          <img src=${Edit} alt="edit_task" class='edit_task'>
          <img src=${Del} alt="delete_task" class='delete_task'>
        </div>
      </div>
      `;
      document
        .querySelector(".tasks_container")
        .insertAdjacentHTML("beforeend", taskTemplate);
    });
    UI.addProjectAndTaskButtons();
  }
}
