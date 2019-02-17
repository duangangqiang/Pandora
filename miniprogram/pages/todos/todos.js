import todosService from '../../services/todos-service';
import Todo from '../../models/Todo';

Page({
  data: {
    todos: [],
    todoInputValue: '',
  },

  onLoad() {
    this.loadAllTodos();
  },

  loadAllTodos() {
    todosService.getAllTodos().then((todos) => {
      this.setData({ todos });
    });
  },

  onInputValue(e) {
    this.setData({
      todoInputValue: e.detail.value,
    });
  },

  onDeleteTodo(e) {
    const { todoId } = e.target.dataset;
    todosService.deleteTodo(todoId).then((todos) => {
      this.setData({ todos });
    });
  },

  onFinishTodo(e) {
    const values = e.detail.value;
    const { todoId } = e.target.dataset;

    let finished = false;
    if (values && values.length > 0) {
      finished = true;
    }

    todosService.finishTodo(todoId, finished).then((todos) => {
      this.setData({ todos });
    });
  },

  confirmInput(e) {
    const inputedValue = e.detail.value;
    if (!inputedValue) return;

    const newTodo = new Todo(inputedValue);

    const todos = [...this.data.todos, newTodo];

    this.setData({
      todos,
      todoInputValue: '',
    });

    todosService.addTodo(newTodo);
  },
});
