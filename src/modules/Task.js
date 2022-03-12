export default class Task {
  constructor(title, description = "", date, notes = "") {
    this.title = title;
    this.description = description;
    this.date = date;
    this.notes = notes;
    this.done = false;
  }
}
