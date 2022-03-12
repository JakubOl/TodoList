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
  // set name(newName) {
  //   this.name = newName;
  // }
  // get name() {
  //   return this.name;
  // }
  // set tasks(newTasks) {
  //   this.tasks = newTasks;
  // }
  // get tasks() {
  //   return this.tasks;
  // }
  addTask(newTask) {
    this.tasks.append(newTask);
  }
  deleteTask(task) {
    this.tasks.filter((task) => task.name !== task);
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
class Store {
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
  }
  set title(newTitle) {
    this.title = newTitle;
  }
  get title() {
    return this.title;
  }
  set description(newDescription) {
    this.description = newDescription;
  }
  get description() {
    return this.description;
  }
  set date(newDate) {
    this.date = newDate;
  }
  get date() {
    return this.date;
  }
  set notes(newNotes) {
    this.notes = newNotes;
  }
  get notes() {
    return this.notes;
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
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Storage */ "./src/modules/Storage.js");
/* harmony import */ var _icons_delete_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/delete.png */ "./src/icons/delete.png");
/* harmony import */ var _icons_edit_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/edit.png */ "./src/icons/edit.png");






const projectWindow = document.querySelector(".project_window");
class UI {
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
    _Storage__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projectName.value));
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
    _Storage__WEBPACK_IMPORTED_MODULE_2__["default"].getProjects().forEach(function (project) {
      if (project) {
        const projectTemplate = `<div class="project">
        <div class="project_name">${project.name}</div>
        <img src=${_icons_delete_png__WEBPACK_IMPORTED_MODULE_3__} alt="edit">
        <img src=${_icons_edit_png__WEBPACK_IMPORTED_MODULE_4__} alt="delete">
        </div>`;
        projectsContainer.insertAdjacentHTML("beforeend", projectTemplate);
      }
    }),
      UI.initProjectButtons();
  }
  static deleteProject(name) {
    _Storage__WEBPACK_IMPORTED_MODULE_2__["default"].removeProject(name.parentElement);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0NlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0IwQjtBQUNNO0FBQ0Y7QUFDUTtBQUNEO0FBQ3JDO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJEQUFnQixLQUFLLGdEQUFPO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFpQjtBQUNyQjtBQUNBO0FBQ0Esb0NBQW9DLGFBQWE7QUFDakQsbUJBQW1CLDhDQUFHLEVBQUU7QUFDeEIsbUJBQW1CLDRDQUFJLEVBQUU7QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksOERBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzNFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7O0FDQThCO0FBQzlCO0FBQ0EsOENBQThDLDREQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgfVxyXG4gIC8vIHNldCBuYW1lKG5ld05hbWUpIHtcclxuICAvLyAgIHRoaXMubmFtZSA9IG5ld05hbWU7XHJcbiAgLy8gfVxyXG4gIC8vIGdldCBuYW1lKCkge1xyXG4gIC8vICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAvLyB9XHJcbiAgLy8gc2V0IHRhc2tzKG5ld1Rhc2tzKSB7XHJcbiAgLy8gICB0aGlzLnRhc2tzID0gbmV3VGFza3M7XHJcbiAgLy8gfVxyXG4gIC8vIGdldCB0YXNrcygpIHtcclxuICAvLyAgIHJldHVybiB0aGlzLnRhc2tzO1xyXG4gIC8vIH1cclxuICBhZGRUYXNrKG5ld1Rhc2spIHtcclxuICAgIHRoaXMudGFza3MuYXBwZW5kKG5ld1Rhc2spO1xyXG4gIH1cclxuICBkZWxldGVUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLm5hbWUgIT09IHRhc2spO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XHJcbiAgc3RhdGljIGdldFByb2plY3RzKCkge1xyXG4gICAgbGV0IHByb2plY3RzO1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikgPT09IG51bGwpIHtcclxuICAgICAgcHJvamVjdHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHByb2plY3RzID0gQXJyYXkuZnJvbShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9qZWN0cztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG4gIHN0YXRpYyByZW1vdmVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICBcInByb2plY3RzXCIsXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgIHByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lICE9PSBuYW1lLmlubmVyVGV4dClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuICB9XHJcbiAgc3RhdGljIGVkaXRQcm9qZWN0KG5hbWUsIG5ld05hbWUpIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gU3RvcmUuZ2V0UHJvamVjdHMoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICBcInByb2plY3RzXCIsXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgIHByb2plY3RzLm1hcCgocHJvamVjdCkgPT5cclxuICAgICAgICAgIHByb2plY3QubmFtZSA9PT0gbmFtZS5pbm5lclRleHRcclxuICAgICAgICAgICAgPyAocHJvamVjdC5uYW1lID0gbmV3TmFtZSlcclxuICAgICAgICAgICAgOiBwcm9qZWN0Lm5hbWVcclxuICAgICAgICApXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG4gIHN0YXRpYyBjbGVhclByb2plY3RzQ29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uID0gXCJcIiwgZGF0ZSwgbm90ZXMgPSBcIlwiKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xyXG4gIH1cclxuICBzZXQgdGl0bGUobmV3VGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcclxuICB9XHJcbiAgZ2V0IHRpdGxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XHJcbiAgfVxyXG4gIHNldCBkZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbikge1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xyXG4gIH1cclxuICBnZXQgZGVzY3JpcHRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcclxuICB9XHJcbiAgc2V0IGRhdGUobmV3RGF0ZSkge1xyXG4gICAgdGhpcy5kYXRlID0gbmV3RGF0ZTtcclxuICB9XHJcbiAgZ2V0IGRhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRlO1xyXG4gIH1cclxuICBzZXQgbm90ZXMobmV3Tm90ZXMpIHtcclxuICAgIHRoaXMubm90ZXMgPSBuZXdOb3RlcztcclxuICB9XHJcbiAgZ2V0IG5vdGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm90ZXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBUYXNrIGZyb20gXCIuL1Rhc2tcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xyXG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4vU3RvcmFnZVwiO1xyXG5pbXBvcnQgRGVsIGZyb20gXCIuLi9pY29ucy9kZWxldGUucG5nXCI7XHJcbmltcG9ydCBFZGl0IGZyb20gXCIuLi9pY29ucy9lZGl0LnBuZ1wiO1xyXG5cclxuY29uc3QgcHJvamVjdFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdF93aW5kb3dcIik7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcclxuICBzdGF0aWMgY3VycmVudFByb2plY3QgPSBcIlwiO1xyXG4gIHN0YXRpYyBsb2FkUGFnZSgpIHtcclxuICAgIFVJLmRpc3BsYXlQcm9qZWN0cygpO1xyXG4gIH1cclxuICBzdGF0aWMgaW5pdFByb2plY3RCdXR0b25zKCkge1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWRkX25ld19wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkuYWRkUHJvamVjdCk7XHJcbiAgICBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jYW5jZWxfbmV3X3Byb2plY3RcIilcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBVSS5jYW5jZWxQcm9qZWN0KTtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFkZF9wcm9qZWN0XCIpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVUkubmV3UHJvamVjdCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIikuZm9yRWFjaCgocHJvamVjdCkgPT5cclxuICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZV9wcm9qZWN0XCIpKSB7XHJcbiAgICAgICAgICBVSS5jdXJyZW50UHJvamVjdCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgVUkuZGlzcGxheVByb2plY3RzVGFza3MoVUkuY3VycmVudFByb2plY3QpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVSS5kZWxldGVQcm9qZWN0KGUudGFyZ2V0KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHN0YXRpYyBhZGRQcm9qZWN0KCkge1xyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RfbmFtZVwiKTtcclxuICAgIGlmICghcHJvamVjdE5hbWUudmFsdWUpIHJldHVybjtcclxuICAgIFN0b3JlLmFkZFByb2plY3QobmV3IFByb2plY3QocHJvamVjdE5hbWUudmFsdWUpKTtcclxuICAgIFVJLmNhbmNlbFByb2plY3QoKTtcclxuICAgIFVJLmNsZWFyRmllbGRzKCk7XHJcbiAgICBVSS5kaXNwbGF5UHJvamVjdHMoKTtcclxuICB9XHJcbiAgc3RhdGljIGNhbmNlbFByb2plY3QoKSB7XHJcbiAgICBwcm9qZWN0V2luZG93LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XHJcbiAgICBVSS5jbGVhckZpZWxkcygpO1xyXG4gIH1cclxuICBzdGF0aWMgbmV3UHJvamVjdCgpIHtcclxuICAgIHByb2plY3RXaW5kb3cuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcclxuICB9XHJcbiAgc3RhdGljIGRpc3BsYXlQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuICAgIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBTdG9yZS5nZXRQcm9qZWN0cygpLmZvckVhY2goZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cInByb2plY3RcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdF9uYW1lXCI+JHtwcm9qZWN0Lm5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGltZyBzcmM9JHtEZWx9IGFsdD1cImVkaXRcIj5cclxuICAgICAgICA8aW1nIHNyYz0ke0VkaXR9IGFsdD1cImRlbGV0ZVwiPlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHByb2plY3RUZW1wbGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgICBVSS5pbml0UHJvamVjdEJ1dHRvbnMoKTtcclxuICB9XHJcbiAgc3RhdGljIGRlbGV0ZVByb2plY3QobmFtZSkge1xyXG4gICAgU3RvcmUucmVtb3ZlUHJvamVjdChuYW1lLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgVUkuZGlzcGxheVByb2plY3RzKCk7XHJcbiAgfVxyXG4gIHN0YXRpYyBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgbm90ZXMpIHt9XHJcbiAgc3RhdGljIGNsZWFyRmllbGRzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0X25hbWVcIikudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuICBzdGF0aWMgZGlzcGxheVByb2plY3RzVGFza3MocHJvamVjdE5hbWUpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxsX3Rhc2tzX2hlYWRlclwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHByb2plY3ROYW1lICsgXCIgdGFza3M6XCI7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7IiwiaW1wb3J0IFVJIGZyb20gXCIuL21vZHVsZXMvVUlcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIFVJLmxvYWRQYWdlKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9