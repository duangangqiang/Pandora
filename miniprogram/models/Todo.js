export default class Todo {
  id = 0;

  txt = '';

  finished = false;

  constructor(txt) {
    this.id = new Date().getTime();
    this.txt = txt;
  }
}
