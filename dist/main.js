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
      .removeEventListener("click", UI.toggleEditWindow);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUJBQWlCO0FBQ2hELCtCQUErQixVQUFVO0FBQ3pDLGdDQUFnQyxXQUFXO0FBQzNDO0FBQ0EscUJBQXFCLDRDQUFJLEVBQUU7QUFDM0IscUJBQXFCLDhDQUFHLEVBQUU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDaE1BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7QUNBOEI7QUFDOUI7QUFDQSw4Q0FBOEMsNERBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9TdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL1VJLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza3MgPSBbXTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xyXG5pbXBvcnQgVGFzayBmcm9tIFwiLi9UYXNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XHJcbiAgc3RhdGljIGdldFByb2plY3RzKCkge1xyXG4gICAgbGV0IHByb2plY3RzO1xyXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB7XHJcbiAgICAgIHByb2plY3RzID0gW107XHJcbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHtcclxuICAgICAgcHJvamVjdHMgPSBBcnJheS5mcm9tKFxyXG4gICAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSlcclxuICAgICAgKS5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgfVxyXG4gIHN0YXRpYyBnZXRQcm9qZWN0KHByb2plY3ROYW1lKSB7XHJcbiAgICByZXR1cm4gU3RvcmUuZ2V0UHJvamVjdHMoKS5maWx0ZXIoZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgcmV0dXJuIHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWU7XHJcbiAgICB9KVswXTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3IFByb2plY3QocHJvamVjdCkpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gIH1cclxuICBzdGF0aWMgcmVtb3ZlUHJvamVjdChyZW1vdmVkKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IFN0b3JlLmdldFByb2plY3RzKCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcclxuICAgICAgXCJwcm9qZWN0c1wiLFxyXG4gICAgICBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICBwcm9qZWN0cy5maWx0ZXIoZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgICAgIHJldHVybiBwcm9qZWN0Lm5hbWUgIT09IHJlbW92ZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcbiAgc3RhdGljIGVkaXRQcm9qZWN0KG9sZE5hbWUsIG5ld05hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIHByb2plY3RzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBvbGROYW1lKSBpdGVtLm5hbWUgPSBuZXdOYW1lO1xyXG4gICAgfSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBhZGRUYXNrKHByb2plY3ROYW1lLCB0YXNrRGF0YSkge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBTdG9yZS5nZXRQcm9qZWN0cygpO1xyXG4gICAgcHJvamVjdHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IHByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgaXRlbS50YXNrcy5wdXNoKFxyXG4gICAgICAgICAgbmV3IFRhc2soXHJcbiAgICAgICAgICAgIHRhc2tEYXRhLnRpdGxlLFxyXG4gICAgICAgICAgICB0YXNrRGF0YS5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgdGFza0RhdGEuZGF0ZSxcclxuICAgICAgICAgICAgdGFza0RhdGEubm90ZXNcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbiAgc3RhdGljIGRlbGV0ZVRhc2socHJvamVjdE5hbWUsIHRhc2tOYW1lKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IFN0b3JlLmdldFByb2plY3RzKCk7XHJcbiAgICBwcm9qZWN0cy5tYXAoZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWUpXHJcbiAgICAgICAgcmV0dXJuIChwcm9qZWN0LnRhc2tzID0gcHJvamVjdC50YXNrcy5maWx0ZXIoXHJcbiAgICAgICAgICAodGFzaykgPT4gdGFzay50aXRsZSAhPT0gdGFza05hbWVcclxuICAgICAgICApKTtcclxuICAgIH0pO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gIH1cclxuICBzdGF0aWMgZWRpdFRhc2socHJvamVjdE5hbWUsIHRhc2tOYW1lLCB0YXNrRGF0YSkge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBTdG9yZS5nZXRQcm9qZWN0cygpO1xyXG4gICAgcHJvamVjdHMubWFwKGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IHByb2plY3ROYW1lKVxyXG4gICAgICAgIHJldHVybiAocHJvamVjdC50YXNrcyA9IHByb2plY3QudGFza3MubWFwKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGFzay50aXRsZSA9PT0gdGFza05hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0YXNrLnRpdGxlID0gdGFza0RhdGEubmV3TmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiA9IFwiXCIsIGRhdGUsIG5vdGVzID0gXCJcIikge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5kYXRlID0gZGF0ZTtcclxuICAgIHRoaXMubm90ZXMgPSBub3RlcztcclxuICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgU3RvcmUgZnJvbSBcIi4vU3RvcmFnZVwiO1xyXG5pbXBvcnQgRGVsIGZyb20gXCIuLi9pY29ucy9kZWxldGUucG5nXCI7XHJcbmltcG9ydCBFZGl0IGZyb20gXCIuLi9pY29ucy9lZGl0LnBuZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gIHN0YXRpYyBjdXJyZW50UHJvamVjdCA9IFwiXCI7XHJcbiAgc3RhdGljIGxvYWRQYWdlKCkge1xyXG4gICAgVUkuaW5pdFByb2plY3RCdXR0b25zKCk7XHJcbiAgICBVSS5kaXNwbGF5UHJvamVjdHMoKTtcclxuICB9XHJcbiAgc3RhdGljIGluaXRQcm9qZWN0QnV0dG9ucygpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFkZF9uZXdfcHJvamVjdFwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFVJLmFkZFByb2plY3QpO1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY2FuY2VsX25ld19wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlUHJvamVjdFdpbmRvdyk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hZGRfcHJvamVjdFwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFVJLnRvZ2dsZVByb2plY3RXaW5kb3cpO1xyXG5cclxuICAgIC8vIEFkZCB0YXNrXHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5hZGRfdGFza19idG5cIilcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBVSS50b2dnbGVUYXNrV2luZG93KTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkX3Rhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgVUkubmV3VGFzaygpO1xyXG4gICAgICBVSS5kaXNwbGF5UHJvamVjdHNUYXNrcygpO1xyXG4gICAgICBVSS50b2dnbGVUYXNrV2luZG93KCk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNhbmNlbF90YXNrXCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFVJLnRvZ2dsZVRhc2tXaW5kb3coKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIHN0YXRpYyBhZGRQcm9qZWN0QW5kVGFza0J1dHRvbnMoKSB7XHJcbiAgICBsZXQgZWRpdGVkUHJvamVjdE5hbWU7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RfbmFtZVwiKS5mb3JFYWNoKChwcm9qZWN0KSA9PlxyXG4gICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIFVJLmN1cnJlbnRQcm9qZWN0ID0gZS50YXJnZXQuaW5uZXJUZXh0O1xyXG4gICAgICAgIFVJLmRpc3BsYXlQcm9qZWN0c1Rhc2tzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZWxldGVfcHJvamVjdFwiKS5mb3JFYWNoKChidG4pID0+XHJcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBVSS5kZWxldGVQcm9qZWN0KFxyXG4gICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLnRleHRDb250ZW50XHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVkaXRfcHJvamVjdFwiKS5mb3JFYWNoKChidG4pID0+XHJcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgVUkuZWRpdFByb2plY3QoXHJcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0XHJcbiAgICAgICAgKTtcclxuICAgICAgICBlZGl0ZWRQcm9qZWN0TmFtZSA9XHJcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnQ7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgLy9FZGl0IHByb2plY3RcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdF9lZGl0X3Byb2plY3RcIilcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgU3RvcmUuZWRpdFByb2plY3QoXHJcbiAgICAgICAgICBlZGl0ZWRQcm9qZWN0TmFtZSxcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdF9uYW1lX2VkaXRcIikudmFsdWVcclxuICAgICAgICApO1xyXG4gICAgICAgIFVJLnRvZ2dsZUVkaXRXaW5kb3coKTtcclxuICAgICAgICBVSS5kaXNwbGF5UHJvamVjdHMoKTtcclxuICAgICAgfSk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5zdWJtaXRfZWRpdF9wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlRWRpdFdpbmRvdyk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jYW5jZWxfZWRpdF9wcm9qZWN0XCIpXHJcbiAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlRWRpdFdpbmRvdyk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jYW5jZWxfZWRpdF9wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkudG9nZ2xlRWRpdFdpbmRvdyk7XHJcblxyXG4gICAgLy9EZWxldGUgdGFza1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgdGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdF90YXNrXCIpKSB7XHJcbiAgICAgICAgICBTdG9yZS5lZGl0VGFzayhcclxuICAgICAgICAgICAgVUkuY3VycmVudFByb2plY3QsXHJcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC50ZXh0Q29udGVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIFVJLmRpc3BsYXlQcm9qZWN0cygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlX3Rhc2tcIikpIHtcclxuICAgICAgICAgIFN0b3JlLmRlbGV0ZVRhc2soXHJcbiAgICAgICAgICAgIFVJLmN1cnJlbnRQcm9qZWN0LFxyXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGV4dENvbnRlbnRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBVSS5kaXNwbGF5UHJvamVjdHNUYXNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgc3RhdGljIGFkZFByb2plY3QoKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdF9uYW1lXCIpO1xyXG4gICAgaWYgKCFwcm9qZWN0TmFtZS52YWx1ZSkgcmV0dXJuO1xyXG4gICAgU3RvcmUuYWRkUHJvamVjdChwcm9qZWN0TmFtZS52YWx1ZSk7XHJcbiAgICBVSS50b2dnbGVQcm9qZWN0V2luZG93KCk7XHJcbiAgICBVSS5jbGVhckZpZWxkcygpO1xyXG4gICAgVUkuZGlzcGxheVByb2plY3RzKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdG9nZ2xlUHJvamVjdFdpbmRvdygpIHtcclxuICAgIFVJLmNsZWFyRmllbGRzKCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3Rfd2luZG93XCIpLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG4gIHN0YXRpYyB0b2dnbGVUYXNrV2luZG93KCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrX3dpbmRvd1wiKS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xyXG4gIH1cclxuICBzdGF0aWMgdG9nZ2xlRWRpdFdpbmRvdygpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdF93aW5kb3dcIikuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcclxuICB9XHJcbiAgc3RhdGljIGRpc3BsYXlQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuICAgIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBTdG9yZS5nZXRQcm9qZWN0cygpLmZvckVhY2goZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cInByb2plY3RcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPSdwcm9qZWN0X25hbWUnPiR7cHJvamVjdC5uYW1lfTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpY29uc1wiPlxyXG4gICAgICAgICAgPGltZyBzcmM9JHtFZGl0fSBhbHQ9XCJlZGl0XCIgY2xhc3M9J2VkaXRfcHJvamVjdCc+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke0RlbH0gYWx0PVwiZGVsZXRlXCIgY2xhc3M9J2RlbGV0ZV9wcm9qZWN0Jz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgIHByb2plY3RzQ29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBwcm9qZWN0VGVtcGxhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIFVJLmFkZFByb2plY3RBbmRUYXNrQnV0dG9ucygpO1xyXG4gIH1cclxuICBzdGF0aWMgZGVsZXRlUHJvamVjdChuYW1lKSB7XHJcbiAgICBTdG9yZS5yZW1vdmVQcm9qZWN0KG5hbWUpO1xyXG4gICAgVUkuZGlzcGxheVByb2plY3RzKCk7XHJcbiAgfVxyXG4gIHN0YXRpYyBlZGl0UHJvamVjdChvbGROYW1lKSB7XHJcbiAgICBVSS50b2dnbGVFZGl0V2luZG93KCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RfbmFtZV9lZGl0XCIpLnZhbHVlID0gb2xkTmFtZTtcclxuICB9XHJcbiAgc3RhdGljIGdldFRhc2tEYXRhKCkge1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IG5vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub3Rlc1wiKS52YWx1ZTtcclxuICAgIHJldHVybiB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgbm90ZXMgfTtcclxuICB9XHJcbiAgc3RhdGljIG5ld1Rhc2soKSB7XHJcbiAgICBpZiAoIVVJLmN1cnJlbnRQcm9qZWN0KSByZXR1cm47XHJcbiAgICBTdG9yZS5hZGRUYXNrKFVJLmN1cnJlbnRQcm9qZWN0LCBVSS5nZXRUYXNrRGF0YSgpKTtcclxuICB9XHJcbiAgc3RhdGljIGNsZWFyRmllbGRzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0X25hbWVcIikudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuICBzdGF0aWMgZGlzcGxheVByb2plY3RzVGFza3MoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzX2NvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgaWYgKFxyXG4gICAgICBVSS5jdXJyZW50UHJvamVjdCA9PT0gXCJcIiB8fFxyXG4gICAgICBTdG9yZS5nZXRQcm9qZWN0KFVJLmN1cnJlbnRQcm9qZWN0KS50YXNrcyA9PT0gW11cclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGxfdGFza3NfaGVhZGVyXCIpLnRleHRDb250ZW50ID1cclxuICAgICAgVUkuY3VycmVudFByb2plY3QgKyBcIiB0YXNrczpcIjtcclxuICAgIFN0b3JlLmdldFByb2plY3QoVUkuY3VycmVudFByb2plY3QpLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKHRhc2spIHtcclxuICAgICAgY29uc3QgdGFza1RlbXBsYXRlID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwidGFza1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPSd0YXNrX25hbWUnPiR7dGFzay50aXRsZX08L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz0ndGFza19kZXNjJz4ke3Rhc2suZGVzY3JpcHRpb259PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J3Rhc2tfZGF0ZSc+JHt0YXNrLmRhdGV9PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9J3Rhc2tfbm90ZXMnPiR7dGFzay5ub3Rlc308L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRhc2tfaWNvbnNcIj5cclxuICAgICAgICAgIDxpbWcgc3JjPSR7RWRpdH0gYWx0PVwiZWRpdF90YXNrXCIgY2xhc3M9J2VkaXRfdGFzayc+XHJcbiAgICAgICAgICA8aW1nIHNyYz0ke0RlbH0gYWx0PVwiZGVsZXRlX3Rhc2tcIiBjbGFzcz0nZGVsZXRlX3Rhc2snPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgICAgZG9jdW1lbnRcclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50YXNrc19jb250YWluZXJcIilcclxuICAgICAgICAuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHRhc2tUZW1wbGF0ZSk7XHJcbiAgICB9KTtcclxuICAgIFVJLmFkZFByb2plY3RBbmRUYXNrQnV0dG9ucygpO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsImltcG9ydCBVSSBmcm9tIFwiLi9tb2R1bGVzL1VJXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBVSS5sb2FkUGFnZSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==