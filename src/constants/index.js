import MarkdownGuide from './markdown-guide'

export const MARKDOWN_GUIDE = MarkdownGuide;
export const CREATE_MENU = [
  {type:'markdown',name:'新建Markdown',icon:'file-add'},
  // {type:'note',name:'新建笔记'},
  {type:'folder',name:'新建文件夹',icon:'folder-add'},
];

export const PLATFORM = (function () {
  if(!window.process) {
    return 'browser';
  }
  return window.process.platform;
})();
