Page({
  data: {
    todos: [],
    index: 0,
  },

  onLoad() {

  },


  confirmInput(e) {
    const index = this.data.index + 1;
    const todos = [...this.data.todos, { index, txt: e.detail.value }];

    this.setData({
      index,
      todos,
    });
  },
});
