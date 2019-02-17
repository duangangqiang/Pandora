export default {

  getAllTodos() {
    return new Promise((resolve) => {
      wx.getStorage({
        key: 'allToDos',
        success(res) {
          if (res.data) {
            resolve(res.data);
          } else {
            resolve([]);
          }
        },
        fail() {
          resolve([]);
        },
      });
    });
  },

  addTodo(newTodo) {
    return new Promise((resolve, reject) => {
      this.getAllTodos().then((allTodos) => {
        const newAllTodos = [...allTodos, newTodo];
        this.saveAllTodos(newAllTodos).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },

  saveAllTodos(newAllTodos) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: 'allToDos',
        data: newAllTodos,
        success() {
          resolve();
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },

  deleteTodo(todoId) {
    return new Promise((resolve, reject) => {
      this.getAllTodos().then((allTodos) => {
        const newAllTodos = allTodos.filter(todo => todo.id !== todoId);
        this.saveAllTodos(newAllTodos).then(() => {
          resolve(newAllTodos);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },

  clearAllTodos() {
    return this.saveAllTodos([]);
  },

  finishTodo(todoId, finished) {
    return new Promise((resolve, reject) => {
      this.getAllTodos().then((allTodos) => {
        const newAllTodos = allTodos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, finished };
          }
          return todo;
        });
        this.saveAllTodos(newAllTodos).then(() => {
          resolve(newAllTodos);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },
};
