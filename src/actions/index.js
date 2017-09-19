export function newFile(data) {
  return {
    type: 'NEW_FILE',
    data: data,
  };
}

export function newFolder(data) {
  return {
    type: 'NEW_FOLDER',
    data: data,
  };
}

export function setActiveFolder(path) {
  return {
    type: 'SET_ACTIVE_FOLDER',
    path,
  };
}

export function setActiveFile(file) {
  return {
    type: 'SET_ACTIVE_FILE',
    file,
  };
}

export function toggleSide(sideCollapsed) {
  return {
    type: 'TOGGLE_SIDE',
    sideCollapsed,
  };
}

export function saveFile(data) {
  return {
    type: 'SAVE_FILE',
    data: data,
  };
}