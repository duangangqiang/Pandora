import notesService from '../../services/notes-service';

Page({
  data: {
    notes: [],
    filter: {
      selectedNoteKey: '0',
      searchText: '',
      noteTypes: [
        { key: '0', value: '全部' },
        { key: '1', value: '心情' },
        { key: '2', value: '随手记' },
        { key: '3', value: '日记' },
      ],
    },
  },

  onLoad() {
    this.loadAllNotes();
  },

  // 加载所有笔记
  loadAllNotes() {
    notesService.getAllNotes().then((notes) => {
      this.setData({
        notes,
      });
    });
  },

  // 修改搜索内容
  changeSearchText(e) {
    const { value } = e.detail;
    this.setData({
      'filter.searchText': value,
    });
  },

  // 修改搜索类型
  changeFilterNoteType(e) {
    const { value } = e.detail;
    this.setData({
      'filter.selectedNoteTypeKey': value,
    });
  },

  // 提交表单
  submitFilterForm(e) {
    console.log(e.detail.value);
  },
});
