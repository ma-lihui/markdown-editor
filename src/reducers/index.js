import {setItem,getItem} from '../common';
let initState = {
  data: [
    {
      type: 'folder',
      name: '我的文件夹',
      key: 'myFolder',
      icon: 'inbox',
      date: '9/9/2017',
      children: [
        {
          type: 'folder',
          name: 'new folder',
          icon: 'folder',
          date: '9/9/2017',
          children: [
            {
              type: 'folder',
              name: 'hello',
              icon: 'folder',
              title: 'hello',
              date: '9/9/2017',
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
  status: {
    sideCollapsed: false,
    activeFolderPath: '/我的文件夹',
    activeFilePath: '',
  },
  setting: {},
};
let store = getItem('store');
if(store) {
  initState = store;
}else {
  setItem('store', initState);
}

function getActiveFolder(state, action) {
  let pathArr = action.path.split('/');
  let activeFolderData = state.data;
  while (pathArr.length) {
    pathArr.shift();
    activeFolderData.forEach(n => {
      if (n.name === pathArr[0] && n.type === 'folder') {
        activeFolderData = n.children || [];
      }
    })
  }
  let activeFileData = activeFolderData[0];
  let files = activeFolderData.filter(f => f.type !== 'folder');
  if (files.length) {
    activeFileData = files[0];
  }
  activeFileData = activeFileData || {};
  return {activeFolderData, activeFileData, activeFolderPath: action.path, activeFilePath: activeFileData.name};
}
function getActiveFile(state, action) {
  return {
    ...state,
    status: {...state.status, activeFilePath: action.file},
    activeFile: state.activeFolder.filter(f => f.name === action.file)[0]
  };
}
function saveFile(state, action) {
  let newState = JSON.parse(JSON.stringify(state));
  let {activeFolderData} = getActiveFolder(newState, {path: state.status.activeFolderPath});
  activeFolderData.forEach((f, i) => {
    if(f.name === state.status.activeFilePath) {
      f.name = action.data.name;
      f.content = action.data.content;
      newState.activeFile = f;
      newState.activeFolder[i] = f;
      newState.status.activeFilePath = f.name;
    }
  });
  return newState;
}

function newFile(state, action) {
  console.log(action);
  let newState = JSON.parse(JSON.stringify(state));
  let {activeFolderData} = getActiveFolder(newState, {path: state.status.activeFolderPath});
  let file = {
    type: 'markdown',
    icon: 'file',
    name: '新建markdown' + new Date() / 1,
    date: new Date().toLocaleDateString(),
    content: ''
  };
  activeFolderData.push(file);
  newState.activeFile = file;
  newState.activeFolder.push(file);
  newState.status.activeFilePath = file.name;
  return newState;
}

function newFolder(state, action) {
}

export default function indexReducer(state = initState, action) {
  let newState = {...state};
  switch (action.type) {
    case 'NEW_MARKDOWN':
      newState = state;
      break;
    case 'SET_ACTIVE_FOLDER':
      newState = {
        ...state,
        activeFolder: getActiveFolder(state, action).activeFolderData,
        activeFile: getActiveFolder(state, action).activeFileData
      };
      newState.status = {
        ...state.status,
        activeFolderPath: getActiveFolder(state, action).activeFolderPath,
        activeFilePath: getActiveFolder(state, action).activeFilePath
      };
      break;
    case 'SET_ACTIVE_FILE':
      newState = getActiveFile(state, action);
      break;
    case 'TOGGLE_SIDE':
      newState.status = {...state.status, sideCollapsed: action.sideCollapsed};
      break;
    case 'NEW_FOLDER':
      newState = newFolder(state, action);
      break;
    case 'NEW_FILE':
      newState = newFile(state, action);
      break;
    case 'SAVE_FILE':
      newState = saveFile(state, action);
      break;
  }
  setItem('store', newState);
  return newState;
}