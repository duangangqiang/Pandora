export default {

  getAllNotes() {
    return new Promise((resolve) => {
      wx.getStorage({
        key: 'allNotes',
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

  addNote(newNote) {
    return new Promise((resolve, reject) => {
      this.getAllNotes().then((allNotes) => {
        const newAllNotes = [...allNotes, newNote];
        this.saveAllNotes(newAllNotes).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },

  saveAllNotes(newAllNotes) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: 'allNotes',
        data: newAllNotes,
        success() {
          resolve();
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },

  deleteNote(NoteId) {
    return new Promise((resolve, reject) => {
      this.getAllNotes().then((allNotes) => {
        const newAllNotes = allNotes.filter(Note => Note.id !== NoteId);
        this.saveAllNotes(newAllNotes).then(() => {
          resolve(newAllNotes);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  },

  clearAllNotes() {
    return this.saveAllNotes([]);
  },
};
