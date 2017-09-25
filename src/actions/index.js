export function newFile(file) {
  return {
    type: 'NEW_FILE',
    file
  };
}

export function newFolder(folder) {
  return {
    type: 'NEW_FOLDER',
    folder
  };
}

export function setActiveFolder(path,activeFilePath) {
  return {
    type: 'SET_ACTIVE_FOLDER',
    path,
    activeFilePath,
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