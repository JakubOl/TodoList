export default class Task {
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
