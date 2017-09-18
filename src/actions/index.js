export function newMarkdown(data) {
  return {
    type: 'NEW_MARKDOWN',
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