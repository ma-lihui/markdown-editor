import {setItem,getItem} from '../common';
import {MARKDOWN_GUIDE} from '../constants'
let initState = {
  data: [
    {
      name: '我的文件夹',
      type: 'folder',
      key: 'myFolder',
      icon: 'inbox',
      date: new Date().toLocaleDateString(),
      children: [
        {
          name: '文件夹',
          type: 'folder',
          icon: 'folder',
          date: new Date().toLocaleDateString(),
          children: []
        },
        {
          name: 'Markdown简介',
          type: 'markdown',
          icon: 'file',
          date: new Date().toLocaleDateString(),
          content: MARKDOWN_GUIDE
        },
      ]
    },
    {
      name: '收藏',
      type: 'folder',
      key: 'collection',
      icon: 'star',
      date: new Date().toLocaleDateString(),
      children: []
    },
    {
      name: '便签',
      type: 'folder',
      key: 'pin',
      icon: 'pushpin',
      date: new Date().toLocaleDateString(),
      children: []
    },
    {
      name: '回收站',
      type: 'folder',
      key: 'delete',
      icon: 'delete',
      date: new Date().toLocaleDateString(),
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
  let newState = JSON.parse(JSON.stringify(state));
  let {activeFolderData} = getActiveFolder(newState, {path: state.status.activeFolderPath});
  let nameIndex = 1;
  let file = {
    name: getFileName(action.file.name,action.file.name,nameIndex,newState.activeFolder),
    type: action.file.type,
    icon: 'file',
    date: new Date().toLocaleDateString(),
    content: '',
  };
  function getFileName(defaultName,name,nameIndex=1,folder){
    if(folder.some(f=>f.name===name)){
      nameIndex++;
      name =`${defaultName}(${nameIndex})`;
      return getFileName(defaultName,name,nameIndex,folder)
    }
    return name
  }
  if(action.file.type === 'folder'){
    file = {...file,icon:'folder',children:[]};
  }
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