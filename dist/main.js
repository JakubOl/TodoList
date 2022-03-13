/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}


/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");



class Store {
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
    projects.push(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](project));
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
          new _Task__WEBPACK_IMPORTED_MODULE_1__["default"](
            taskData.title,
            taskData.description,
            taskData.date,
            taskData.notes
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
    projects.map(function (project) {
      if (project.name === projectName)
        return (project.tasks = project.tasks.map((task) => {
          if (task.title === taskName) {
            return (task.title = taskData.newName);
          }
        }));
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}


/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(title, description = "", date, notes = "") {
    this.title = title;
    this.description = description;
    this.date = date;
    this.notes = notes;
    this.done = false;
  }
}


/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/modules/Storage.js");
/* harmony import */ var _icons_delete_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons/delete.png */ "./src/icons/delete.png");
/* harmony import */ var _icons_edit_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons/edit.png */ "./src/icons/edit.png");




const projectWindow = document.querySelector(".project_window");
class UI {
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

    document.querySelectorAll(".project").forEach((project) =>
      project.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete_project")) {
          UI.deleteProject(
            e.target.parentElement.parentElement.firstElementChild.textContent
          );
        } else if (e.target.classList.contains("edit_project")) {
          UI.editProject(
            e.target.parentElement.parentElement.firstElementChild.innerText
          );
          editedProjectName =
            e.target.parentElement.parentElement.firstElementChild.textContent;
        } else if (e.target.classList.contains("project_name")) {
          UI.currentProject = e.target.innerText;
          UI.displayProjectsTasks();
        }
      })
    );
    //Edit project
    document
      .querySelector(".submit_edit_project")
      .addEventListener("click", function () {
        _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(
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
      .addEventListener("click", UI.toggleEditWindow);

    //Delete task
    document.querySelectorAll(".task").forEach((task) => {
      task.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit_task")) {
          _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(
            UI.currentProject,
            e.target.parentElement.parentElement.firstElementChild.textContent
          );
          UI.displayProjects();
        } else if (e.target.classList.contains("delete_task")) {
          _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTask(
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
    _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(projectName.value);
    UI.toggleProjectWindow();
    UI.clearFields();
    UI.displayProjects();
  }

  static toggleProjectWindow() {
    UI.clearFields();
    projectWindow.classList.toggle("hidden");
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
    _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects().forEach(function (project) {
      if (project) {
        const projectTemplate = `<div class="project">
        <div class='project_name'>${project.name}</div>
        <div class="icons">
          <img src=${_icons_edit_png__WEBPACK_IMPORTED_MODULE_2__} alt="edit" class='edit_project'>
          <img src=${_icons_delete_png__WEBPACK_IMPORTED_MODULE_1__} alt="delete" class='delete_project'>
        </div>
        </div>`;
        projectsContainer.insertAdjacentHTML("beforeend", projectTemplate);
      }
    });
    UI.addProjectAndTaskButtons();
  }
  static deleteProject(name) {
    _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].removeProject(name);
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
    _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(UI.currentProject, UI.getTaskData());
  }
  static clearFields() {
    document.querySelector("#project_name").value = "";
  }
  static displayProjectsTasks() {
    document.querySelector(".tasks_container").innerHTML = "";
    if (
      UI.currentProject === "" ||
      _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(UI.currentProject).tasks === []
    )
      return;
    document.querySelector(".all_tasks_header").textContent =
      UI.currentProject + " tasks:";
    _Storage__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(UI.currentProject).tasks.forEach(function (task) {
      const taskTemplate = `
      <div class="task">
      <div class='task_name'>${task.title}</div>
      <div class='task_desc'>${task.description}</div>
      <div class='task_date'>${task.date}</div>
      <div class='task_notes'>${task.notes}</div>
      <div class="task_icons">
          <img src=${_icons_edit_png__WEBPACK_IMPORTED_MODULE_2__} alt="edit_task" class='edit_task'>
          <img src=${_icons_delete_png__WEBPACK_IMPORTED_MODULE_1__} alt="delete_task" class='delete_task'>
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


/***/ }),

/***/ "./src/icons/delete.png":
/*!******************************!*\
  !*** ./src/icons/delete.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fa614d8f604270532647.png";

/***/ }),

/***/ "./src/icons/edit.png":
/*!****************************!*\
  !*** ./src/icons/edit.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c5498105a16385faca69.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");


document.addEventListener("DOMContentLoaded", _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVc7QUFDM0M7QUFDQSxxQkFBcUIsNENBQUksRUFBRTtBQUMzQixxQkFBcUIsOENBQUcsRUFBRTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN4TEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7OztBQ0E4QjtBQUM5QjtBQUNBLDhDQUE4Qyw0REFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9UYXNrLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvVUkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0XCI7XHJcbmltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcclxuICBzdGF0aWMgZ2V0UHJvamVjdHMoKSB7XHJcbiAgICBsZXQgcHJvamVjdHM7XHJcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHtcclxuICAgICAgcHJvamVjdHMgPSBbXTtcclxuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkge1xyXG4gICAgICBwcm9qZWN0cyA9IEFycmF5LmZyb20oXHJcbiAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKVxyXG4gICAgICApLmZpbHRlcigodmFsdWUpID0+IHZhbHVlICE9PSBudWxsKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9qZWN0cztcclxuICB9XHJcbiAgc3RhdGljIGdldFByb2plY3QocHJvamVjdE5hbWUpIHtcclxuICAgIHJldHVybiBTdG9yZS5nZXRQcm9qZWN0cygpLmZpbHRlcihmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICByZXR1cm4gcHJvamVjdC5uYW1lID09PSBwcm9qZWN0TmFtZTtcclxuICAgIH0pWzBdO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFkZFByb2plY3QocHJvamVjdCkge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBTdG9yZS5nZXRQcm9qZWN0cygpO1xyXG4gICAgcHJvamVjdHMucHVzaChuZXcgUHJvamVjdChwcm9qZWN0KSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG4gIHN0YXRpYyByZW1vdmVQcm9qZWN0KHJlbW92ZWQpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICBcInByb2plY3RzXCIsXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgIHByb2plY3RzLmZpbHRlcihmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgcmV0dXJuIHByb2plY3QubmFtZSAhPT0gcmVtb3ZlZDtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuICBzdGF0aWMgZWRpdFByb2plY3Qob2xkTmFtZSwgbmV3TmFtZSkge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBTdG9yZS5nZXRQcm9qZWN0cygpO1xyXG4gICAgcHJvamVjdHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG9sZE5hbWUpIGl0ZW0ubmFtZSA9IG5ld05hbWU7XHJcbiAgICB9KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbiAgc3RhdGljIGFkZFRhc2socHJvamVjdE5hbWUsIHRhc2tEYXRhKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IFN0b3JlLmdldFByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0cy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcclxuICAgICAgICBpdGVtLnRhc2tzLnB1c2goXHJcbiAgICAgICAgICBuZXcgVGFzayhcclxuICAgICAgICAgICAgdGFza0RhdGEudGl0bGUsXHJcbiAgICAgICAgICAgIHRhc2tEYXRhLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICB0YXNrRGF0YS5kYXRlLFxyXG4gICAgICAgICAgICB0YXNrRGF0YS5ub3Rlc1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gIH1cclxuICBzdGF0aWMgZGVsZXRlVGFzayhwcm9qZWN0TmFtZSwgdGFza05hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIHByb2plY3RzLm1hcChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICBpZiAocHJvamVjdC5uYW1lID09PSBwcm9qZWN0TmFtZSlcclxuICAgICAgICByZXR1cm4gKHByb2plY3QudGFza3MgPSBwcm9qZWN0LnRhc2tzLmZpbHRlcihcclxuICAgICAgICAgICh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSB0YXNrTmFtZVxyXG4gICAgICAgICkpO1xyXG4gICAgfSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBlZGl0VGFzayhwcm9qZWN0TmFtZSwgdGFza05hbWUsIHRhc2tEYXRhKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IFN0b3JlLmdldFByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0cy5tYXAoZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWUpXHJcbiAgICAgICAgcmV0dXJuIChwcm9qZWN0LnRhc2tzID0gcHJvamVjdC50YXNrcy5tYXAoKHRhc2spID0+IHtcclxuICAgICAgICAgIGlmICh0YXNrLnRpdGxlID09PSB0YXNrTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRhc2sudGl0bGUgPSB0YXNrRGF0YS5uZXdOYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uID0gXCJcIiwgZGF0ZSwgbm90ZXMgPSBcIlwiKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xyXG4gICAgdGhpcy5kb25lID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBTdG9yZSBmcm9tIFwiLi9TdG9yYWdlXCI7XHJcbmltcG9ydCBEZWwgZnJvbSBcIi4uL2ljb25zL2RlbGV0ZS5wbmdcIjtcclxuaW1wb3J0IEVkaXQgZnJvbSBcIi4uL2ljb25zL2VkaXQucG5nXCI7XHJcblxyXG5jb25zdCBwcm9qZWN0V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0X3dpbmRvd1wiKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjdXJyZW50UHJvamVjdCA9IFwiXCI7XHJcbiAgc3RhdGljIGxvYWRQYWdlKCkge1xyXG4gICAgVUkuaW5pdFByb2plY3RCdXR0b25zKCk7XHJcbiAgICBVSS5kaXNwbGF5UHJvamVjdHMoKTtcclxuICB9XHJcbiAgc3RhdGljIGluaXRQcm9qZWN0QnV0dG9ucygpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFkZF9uZXdfcHJvamVjdFwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFVJLmFkZFByb2plY3QpO1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsX25ld19wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlUHJvamVjdFdpbmRvdyk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hZGRfcHJvamVjdFwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFVJLnRvZ2dsZVByb2plY3RXaW5kb3cpO1xyXG5cclxuICAgIC8vIEFkZCB0YXNrXHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hZGRfdGFza19idG5cIilcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBVSS50b2dnbGVUYXNrV2luZG93KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkX3Rhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgVUkubmV3VGFzaygpO1xyXG4gICAgICBVSS5kaXNwbGF5UHJvamVjdHNUYXNrcygpO1xyXG4gICAgICBVSS50b2dnbGVUYXNrV2luZG93KCk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbF90YXNrXCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFVJLnRvZ2dsZVRhc2tXaW5kb3coKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBhZGRQcm9qZWN0QW5kVGFza0J1dHRvbnMoKSB7XHJcbiAgICBsZXQgZWRpdGVkUHJvamVjdE5hbWU7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpLmZvckVhY2goKHByb2plY3QpID0+XHJcbiAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZV9wcm9qZWN0XCIpKSB7XHJcbiAgICAgICAgICBVSS5kZWxldGVQcm9qZWN0KFxyXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0X3Byb2plY3RcIikpIHtcclxuICAgICAgICAgIFVJLmVkaXRQcm9qZWN0KFxyXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgZWRpdGVkUHJvamVjdE5hbWUgPVxyXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0X25hbWVcIikpIHtcclxuICAgICAgICAgIFVJLmN1cnJlbnRQcm9qZWN0ID0gZS50YXJnZXQuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgVUkuZGlzcGxheVByb2plY3RzVGFza3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgLy9FZGl0IHByb2plY3RcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdF9lZGl0X3Byb2plY3RcIilcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3RvcmUuZWRpdFByb2plY3QoXHJcbiAgICAgICAgICBlZGl0ZWRQcm9qZWN0TmFtZSxcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdF9uYW1lX2VkaXRcIikudmFsdWVcclxuICAgICAgICApO1xyXG4gICAgICAgIFVJLnRvZ2dsZUVkaXRXaW5kb3coKTtcclxuICAgICAgICBVSS5kaXNwbGF5UHJvamVjdHMoKTtcclxuICAgICAgfSk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRfZWRpdF9wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlRWRpdFdpbmRvdyk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jYW5jZWxfZWRpdF9wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlRWRpdFdpbmRvdyk7XHJcblxyXG4gICAgLy9EZWxldGUgdGFza1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgdGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdF90YXNrXCIpKSB7XHJcbiAgICAgICAgICBTdG9yZS5lZGl0VGFzayhcclxuICAgICAgICAgICAgVUkuY3VycmVudFByb2plY3QsXHJcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIFVJLmRpc3BsYXlQcm9qZWN0cygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlX3Rhc2tcIikpIHtcclxuICAgICAgICAgIFN0b3JlLmRlbGV0ZVRhc2soXHJcbiAgICAgICAgICAgIFVJLmN1cnJlbnRQcm9qZWN0LFxyXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBVSS5kaXNwbGF5UHJvamVjdHNUYXNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgc3RhdGljIGFkZFByb2plY3QoKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdF9uYW1lXCIpO1xyXG4gICAgaWYgKCFwcm9qZWN0TmFtZS52YWx1ZSkgcmV0dXJuO1xyXG4gICAgU3RvcmUuYWRkUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XHJcbiAgICBVSS50b2dnbGVQcm9qZWN0V2luZG93KCk7XHJcbiAgICBVSS5jbGVhckZpZWxkcygpO1xyXG4gICAgVUkuZGlzcGxheVByb2plY3RzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdG9nZ2xlUHJvamVjdFdpbmRvdygpIHtcclxuICAgIFVJLmNsZWFyRmllbGRzKCk7XHJcbiAgICBwcm9qZWN0V2luZG93LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG4gIHN0YXRpYyB0b2dnbGVUYXNrV2luZG93KCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrX3dpbmRvd1wiKS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxuICBzdGF0aWMgdG9nZ2xlRWRpdFdpbmRvdygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdF93aW5kb3dcIikuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcclxuICB9XHJcbiAgc3RhdGljIGRpc3BsYXlQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuICAgIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBTdG9yZS5nZXRQcm9qZWN0cygpLmZvckVhY2goZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cInByb2plY3RcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdwcm9qZWN0X25hbWUnPiR7cHJvamVjdC5uYW1lfTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uc1wiPlxyXG4gICAgICAgICAgPGltZyBzcmM9JHtFZGl0fSBhbHQ9XCJlZGl0XCIgY2xhc3M9J2VkaXRfcHJvamVjdCc+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke0RlbH0gYWx0PVwiZGVsZXRlXCIgY2xhc3M9J2RlbGV0ZV9wcm9qZWN0Jz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBwcm9qZWN0VGVtcGxhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFVJLmFkZFByb2plY3RBbmRUYXNrQnV0dG9ucygpO1xyXG4gIH1cclxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChuYW1lKSB7XHJcbiAgICBTdG9yZS5yZW1vdmVQcm9qZWN0KG5hbWUpO1xyXG4gICAgVUkuZGlzcGxheVByb2plY3RzKCk7XHJcbiAgfVxyXG4gIHN0YXRpYyBlZGl0UHJvamVjdChvbGROYW1lKSB7XHJcbiAgICBVSS50b2dnbGVFZGl0V2luZG93KCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RfbmFtZV9lZGl0XCIpLnZhbHVlID0gb2xkTmFtZTtcclxuICB9XHJcbiAgc3RhdGljIGdldFRhc2tEYXRhKCkge1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IG5vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub3Rlc1wiKS52YWx1ZTtcclxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgbm90ZXMgfTtcclxuICB9XHJcbiAgc3RhdGljIG5ld1Rhc2soKSB7XHJcbiAgICBpZiAoIVVJLmN1cnJlbnRQcm9qZWN0KSByZXR1cm47XHJcbiAgICBTdG9yZS5hZGRUYXNrKFVJLmN1cnJlbnRQcm9qZWN0LCBVSS5nZXRUYXNrRGF0YSgpKTtcclxuICB9XHJcbiAgc3RhdGljIGNsZWFyRmllbGRzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0X25hbWVcIikudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuICBzdGF0aWMgZGlzcGxheVByb2plY3RzVGFza3MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzX2NvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgaWYgKFxyXG4gICAgICBVSS5jdXJyZW50UHJvamVjdCA9PT0gXCJcIiB8fFxyXG4gICAgICBTdG9yZS5nZXRQcm9qZWN0KFVJLmN1cnJlbnRQcm9qZWN0KS50YXNrcyA9PT0gW11cclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGxfdGFza3NfaGVhZGVyXCIpLnRleHRDb250ZW50ID1cclxuICAgICAgVUkuY3VycmVudFByb2plY3QgKyBcIiB0YXNrczpcIjtcclxuICAgIFN0b3JlLmdldFByb2plY3QoVUkuY3VycmVudFByb2plY3QpLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKHRhc2spIHtcclxuICAgICAgY29uc3QgdGFza1RlbXBsYXRlID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwidGFza1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YXNrX25hbWUnPiR7dGFzay50aXRsZX08L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz0ndGFza19kZXNjJz4ke3Rhc2suZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J3Rhc2tfZGF0ZSc+JHt0YXNrLmRhdGV9PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J3Rhc2tfbm90ZXMnPiR7dGFzay5ub3Rlc308L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tfaWNvbnNcIj5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7RWRpdH0gYWx0PVwiZWRpdF90YXNrXCIgY2xhc3M9J2VkaXRfdGFzayc+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke0RlbH0gYWx0PVwiZGVsZXRlX3Rhc2tcIiBjbGFzcz0nZGVsZXRlX3Rhc2snPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgICAgZG9jdW1lbnRcclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50YXNrc19jb250YWluZXJcIilcclxuICAgICAgICAuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHRhc2tUZW1wbGF0ZSk7XHJcbiAgICB9KTtcclxuICAgIFVJLmFkZFByb2plY3RBbmRUYXNrQnV0dG9ucygpO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsImltcG9ydCBVSSBmcm9tIFwiLi9tb2R1bGVzL1VJXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBVSS5sb2FkUGFnZSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==