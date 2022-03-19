import Store from "./Storage";
import Del from "../icons/delete.png";
import Edit from "../icons/edit.png";

export default class UI {
  static currentProject = "";
  static currentTask = "";
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
    document.querySelector(".btn.done").addEventListener("click", function (e) {
      if (e.target.textContent === "Done") {
        e.target.textContent = "Not Done";
        e.target.value = false;
      } else {
        e.target.textContent = "Done";
        e.target.value = true;
      }
    });
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
    document.querySelector(".today").addEventListener("click", UI.displayToday);
    document
      .querySelector(".week")
      .addEventListener("click", UI.displayThisWeek);

    document
      .querySelector(".not_done")
      .addEventListener("click", UI.displayNotDone);
    document.querySelector(".done").addEventListener("click", UI.displayDone);
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
          UI.loadTaskData(
            e.target.parentElement.parentElement.firstElementChild.textContent
          );
          UI.toggleTaskWindow();
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
  static hideAddTask() {
    document.querySelector(".add_task_btn").classList.add("hidden");
  }
  static showAddTask() {
    document.querySelector(".add_task_btn").classList.remove("hidden");
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
    const done = document.querySelector(".btn.done").value;
    return { title, description, date, notes, done };
  }
  static setTaskData(taskName) {
    document.querySelector("#title").value = taskName.title;
    document.querySelector("#description").value = taskName.description;
    document.querySelector("#date").value = taskName.date;
    document.querySelector("#notes").value = taskName.notes;
  }
  static newTask() {
    if (!UI.currentProject) return;
    if (!Store.getTask(UI.currentProject, UI.currentTask)) {
      Store.addTask(UI.currentProject, UI.getTaskData());
      return;
    }
    Store.editTask(UI.currentProject, UI.currentTask, UI.getTaskData());
  }
  static clearFields() {
    document.querySelector("#project_name").value = "";
  }
  static taskTemplate(task) {
    const taskTemplate = `
      <div class="task">
      <div class='task_name'>${task.title}</div>
      <div class='task_desc'>${task.description}</div>
      <div class='task_date'>${task.date}</div>
      <div class='task_notes'>${task.notes}</div>
      <div class='task_status'>${
        task.done === "true" ? "Done" : "Not Done"
      }</div>
      <div class="task_icons">
          <img src=${Edit} alt="edit_task" class='edit_task'>
          <img src=${Del} alt="delete_task" class='delete_task'>
        </div>
      </div>
      `;
    document
      .querySelector(".tasks_container")
      .insertAdjacentHTML("beforeend", taskTemplate);
  }

  static displayProjectsTasks() {
    if (
      UI.currentProject === "" ||
      Store.getProject(UI.currentProject).tasks === []
    )
      return;
    document.querySelector(".tasks_container").innerHTML = "";
    document.querySelector(".all_tasks_header").textContent =
      UI.currentProject + " tasks:";
    Store.getProject(UI.currentProject).tasks.forEach(function (task) {
      UI.taskTemplate(task);
    });
    UI.addProjectAndTaskButtons();
    UI.showAddTask();
  }
  static loadTaskData(taskName) {
    const task = Store.getTask(UI.currentProject, taskName);
    UI.currentTask = taskName;
    UI.setTaskData(task);
  }
  static displayNotDone() {
    document.querySelector(".tasks_container").innerHTML = "";
    document.querySelector(".all_tasks_header").textContent = "Not done tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (task.done === "false") {
          UI.taskTemplate(task);
        }
      })
    );
    UI.addProjectAndTaskButtons();
    UI.hideAddTask();
  }
  static displayDone() {
    document.querySelector(".tasks_container").innerHTML = "";
    document.querySelector(".all_tasks_header").textContent = "Done tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (task.done === "true") {
          UI.taskTemplate(task);
        }
      })
    );
    UI.addProjectAndTaskButtons();
    UI.hideAddTask();
  }
  static getDate() {
    const today = new Date();
    let year = new Intl.DateTimeFormat("en", { year: "numeric" })
      .format(today)
      .padStart(2, 0);
    let month = new Intl.DateTimeFormat("en", { month: "numeric" })
      .format(today)
      .padStart(2, 0);
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(today);
    const date = `${year}-${month}-${day}`;
    return date;
  }
  static isDateInThisWeek(date) {
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    const tasksDate = new Date(date);
    return tasksDate >= firstDayOfWeek && tasksDate <= lastDayOfWeek;
  }
  static displayToday() {
    document.querySelector(".tasks_container").innerHTML = "";
    document.querySelector(".all_tasks_header").textContent = "Today tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (task.date !== UI.getDate()) return;
        UI.taskTemplate(task);
      })
    );
    UI.addProjectAndTaskButtons();
    UI.hideAddTask();
  }
  static displayThisWeek() {
    document.querySelector(".tasks_container").innerHTML = "";
    document.querySelector(".all_tasks_header").textContent =
      "This week tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (!UI.isDateInThisWeek(task.date)) return;
        UI.taskTemplate(task);
      })
    );
    UI.addProjectAndTaskButtons();
    UI.hideAddTask();
  }
}
