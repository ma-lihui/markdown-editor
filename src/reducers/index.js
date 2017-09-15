
let initState = {
  data: [
    {
      type: 'folder',
      name: '我的文件夹',
      key: 'myFolder',
      icon: 'inbox',
      date: '9/9/2017',
      children:[
        {
          type: 'folder',
          name: 'new folder',
          icon: 'folder',
          date: '9/9/2017',
          children: [
            {
              type: 'markdown',
              name: 'hello',
              icon: 'file',
              title: 'hello',
              date: '9/9/2017',
              content: `Hello **world!**`
            }
          ]
        },
        {
          type: 'folder',
          name: 'new folder2',
          icon: 'folder',
          date: '9/9/2017',
          children: [
            {
              type: 'markdown',
              name: 'hello2',
              icon: 'file',
              title: 'hello',
              date: '9/9/2017',
              content: `Hello **world!**`
            }
          ]
        },
        {
          type: 'markdown',
          icon: 'file',
          name: 'MarkDown的基本使用',
          title: 'MarkDown的基本使用',
          date: '9/9/2017',
          content: `Welcome to **StackEdit!**`
        }
      ]
    },
    {
      type: 'folder',
      name: '收藏',
      icon: 'star',
      date: '9/9/2017',
      children: []
    },
    {
      type: 'folder',
      name: '便签',
      key: 'pin',
      icon: 'pushpin',
      date: '9/9/2017',
      children: [
        {
          type: 'markdown',
          icon: 'file',
          name: 'test',
          title: 'pin',
          date: '9/9/2017',
          content: `Welcome `
        }
      ]
    },
    {
      type: 'folder',
      name: '回收站',
      icon: 'delete',
      date: '9/9/2017',
      children: []
    },
  ],
  activeFolder: [],
  activeFile: {},
  status:{

  },
  setting: {},
};
function getActiveFolder(state, action) {

}
export default function indexReducer(state = initState, action) {
  let newState = {...state};
  switch (action.type) {
    case 'NEW_MARKDOWN':
      newState = state;
      break;
    case 'SET_ACTIVE_FOLDER':
      newState.status.activeFolder = getActiveFolder(state,action);
      break;
  }

  return newState;
}