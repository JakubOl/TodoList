export default class Project {
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
