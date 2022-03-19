export default class Task {
  constructor(title, description = "", date, notes = "", done = false) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.notes = notes;
    this.done = done;
  }
}
