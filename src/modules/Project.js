import Task from "./Task";
export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
  addTask(title, description, date, notes) {
    this.tasks.push(new Task(title, description, date, notes));
  }
  deleteTask() {
    this.tasks = this.tasks.filter((task) => task.name !== taskDel);
  }
  changeName(newName) {
    this.name = newName;
  }
}
