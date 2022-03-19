import Store from "./Storage";
import Del from "../icons/delete.png";
import Edit from "../icons/edit.png";

export default class UI {
  static currentProject = "";
  static currentTask = "";
  static loadPage() {
    UI.initButtons();
    UI.displayProjects();
    UI.addProjectAndTaskButtons();
  }
  static initButtons() {
    document.addEventListener("click", function (e) {
      e.preventDefault();
      if (UI.targetContains(e, "add_new_project")) {
        UI.addProject();
      } else if (
        UI.targetContains(e, "cancel_new_project") ||
        UI.targetContains(e, "add_project")
      ) {
        UI.toggleProjectWindow();
      } else if (UI.targetContains(e, "btn_done")) {
        if (e.target.textContent === "Done") {
          e.target.textContent = "Not Done";
          e.target.value = false;
        } else {
          e.target.textContent = "Done";
          e.target.value = true;
        }
      } else if (
        UI.targetContains(e, "add_task_btn") ||
        UI.targetContains(e, "cancel_task")
      ) {
        UI.toggleTaskWindow();
      } else if (UI.targetContains(e, "add_task")) {
        UI.newTask();
        UI.displayProjectsTasks();
        UI.toggleTaskWindow();
      } else if (UI.targetContains(e, "today")) {
        UI.displayToday();
      } else if (UI.targetContains(e, "week")) {
        UI.displayThisWeek();
      } else if (UI.targetContains(e, "not_done")) {
        UI.doneStatusDisplay("false");
      } else if (UI.targetContains(e, "done")) {
        UI.doneStatusDisplay("true");
      }
    });
  }
  static targetContains(e, classItem) {
    return e.target.classList.contains(classItem);
  }
  static addProjectAndTaskButtons() {
    let editedProjectName;
    document.body.addEventListener("click", function (e) {
      if (UI.targetContains(e, "project_name")) {
        UI.currentProject = e.target.innerText;
        UI.displayProjectsTasks();
      } else if (UI.targetContains(e, "delete_project")) {
        UI.deleteProject(
          e.target.parentElement.parentElement.firstElementChild.textContent
        );
      } else if (UI.targetContains(e, "edit_project")) {
        UI.editProject(
          e.target.parentElement.parentElement.firstElementChild.innerText
        );
        editedProjectName =
          e.target.parentElement.parentElement.firstElementChild.textContent;
      } else if (UI.targetContains(e, "submit_edit_project")) {
        Store.editProject(
          editedProjectName,
          document.querySelector("#project_name_edit").value
        );
        UI.displayProjects();
        UI.toggleEditWindow();
      } else if (UI.targetContains(e, "cancel_edit_project")) {
        UI.toggleEditWindow();
      } else if (UI.targetContains(e, "edit_task")) {
        UI.loadTaskData(
          e.target.parentElement.parentElement.firstElementChild.textContent
        );
        UI.toggleTaskWindow();
      } else if (UI.targetContains(e, "delete_task")) {
        Store.deleteTask(
          UI.currentProject,
          e.target.parentElement.parentElement.firstElementChild.textContent
        );
        UI.displayProjectsTasks();
      }
    });
  }
  static addProject() {
    const projectName = document.querySelector("#project_name");
    if (!projectName.value) return;
    Store.addProject(projectName.value);
    UI.toggleProjectWindow();
    UI.displayProjects();
  }

  static toggleProjectWindow() {
    UI.clearInputFields();
    document.querySelector(".project_window").classList.toggle("hidden");
  }
  static toggleTaskWindow() {
    UI.clearInputFields();
    document.querySelector(".task_window").classList.toggle("hidden");
  }
  static toggleEditWindow() {
    UI.clearInputFields();
    document.querySelector(".edit_window").classList.toggle("hidden");
  }
  static hideAddTask() {
    UI.clearInputFields();
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
    const done = document.querySelector(".btn_done").value;
    return { title, description, date, notes, done };
  }
  static setTaskData(taskName = "") {
    document.querySelector("#title").value = taskName?.title;
    document.querySelector("#description").value = taskName?.description;
    document.querySelector("#date").value = taskName?.date;
    document.querySelector("#notes").value = taskName?.notes;
  }
  static newTask() {
    if (!Store.getTask(UI.currentProject, UI.currentTask)) {
      Store.addTask(UI.currentProject, UI.getTaskData());
      return;
    }
    Store.editTask(UI.currentProject, UI.currentTask, UI.getTaskData());
  }
  static clearInputFields() {
    document.querySelector("#project_name").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#notes").value = "";
  }
  static clearTasks() {
    document.querySelector(".tasks_container").innerHTML = "";
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
    UI.clearTasks();
    document.querySelector(".all_tasks_header").textContent =
      UI.currentProject + " tasks:";
    Store.getProject(UI.currentProject).tasks.forEach(function (task) {
      UI.taskTemplate(task);
    });
    UI.showAddTask();
  }
  static loadTaskData(taskName) {
    const task = Store.getTask(UI.currentProject, taskName);
    UI.currentTask = taskName;
    UI.setTaskData(task);
  }
  static doneStatusDisplay(status) {
    UI.clearTasks();
    document.querySelector(".all_tasks_header").textContent = "Not done tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (task.done === status) {
          UI.taskTemplate(task);
        }
      })
    );
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
    UI.clearTasks();
    document.querySelector(".all_tasks_header").textContent = "Today tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (task.date !== UI.getDate()) return;
        UI.taskTemplate(task);
      })
    );
    UI.hideAddTask();
  }

  static displayThisWeek() {
    UI.clearTasks();
    document.querySelector(".all_tasks_header").textContent =
      "This week tasks:";
    Store.getProjects().forEach((project) =>
      project.tasks.forEach((task) => {
        if (!UI.isDateInThisWeek(task.date)) return;
        UI.taskTemplate(task);
      })
    );
    UI.hideAddTask();
  }
}
