
let initState = {
  data: [
    {
      type: 'folder',
      name: 'new folder',
      date: '9/9/2017',
      child: [
        {
          type: 'markdown',
          title: 'hello',
          date: '9/9/2017',
          content: `Hello **world!**`
        }
      ]
    },
    {
      type: 'folder',
      name: 'new folder2',
      date: '9/9/2017',
      child: [
        {
          type: 'markdown',
          title: 'hello',
          date: '9/9/2017',
          content: `Hello **world!**`
        }
      ]
    },
    {
      type: 'markdown',
      name: 'MarkDown的基本使用',
      title: 'MarkDown的基本使用',
      date: '9/9/2017',
      content: `Welcome to **StackEdit!**`
    }
  ],
  status:{
    activeFolder: [],
    activeFile: {},
  },
  setting: {},
};
export default function indexReducer(state = initState, action) {
  let newState = {...state};
  switch (action.type) {
    case 'NEW_MARKDOWN':
      newState = state;
      break;
    case 'SET_ACTIVE_FOLDER':
      newState.status.activeFolder = state.data;
      break;
  }

  return newState;
}