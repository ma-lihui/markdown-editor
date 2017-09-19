import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveFile} from '../../actions'
import marked from 'marked';
// import Highlight from 'highlight'

import CodeMirror from 'codemirror';
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/javascript/javascript");
import './markdown-editor.css'
import '../../css/github-markdown.css'


import {Layout, Button, Input, Icon} from 'antd';
const {Header} = Layout;
import './index.css'
class EditArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.activeFile.name || '',
      markdownContent: this.props.activeFile.content || ''
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      title: nextProps.activeFile.name || '',
      markdownContent: nextProps.activeFile.content || ''
    });
    this.CodeMirror.setValue(nextProps.activeFile.content || '');
  }
  componentDidMount(){
     this.CodeMirror = CodeMirror.fromTextArea(this.textarea, {
      mode: 'markdown',
      theme: "paper",
      tabSize:  2,
      indentUnit:  2,
      lineNumbers: false,
      allowDropFileTypes: ['text/plain','text/x-markdown'],
      highlightFormatting: true,
      scrollbarStyle: null,
      lineWrapping: true,
      // autoRefresh:true,
    });
    this.CodeMirror.setValue(this.props.activeFile.content || '');
    this.CodeMirror.on('change',(instance,changeObj)=>{
      this.setState({
        markdownContent: this.CodeMirror.getValue()
      });
    });
    // document.getElementsByClassName('CodeMirror-scroll')[0].setAttribute('data-scrollbar', '');

  }

  saveClickHandle = () => {
    let {title,markdownContent} = this.state;
    this.props.saveFile({
      name: title,
      content: markdownContent
    })
  };
  titleChangeHandle(e){
    this.setState({
      title: e.target.value
    })
  }

  onMouseDownHandle(e){
    this.initX = this.initX || e.pageX;
    e.persist();
    let handleMouseMove = (ev) => {
      ev.preventDefault();
      let editorWidthPercent = ( ev.pageX - this.editor.offsetLeft ) / this.content.offsetWidth * 100;

      ( ev.pageX - this.editor.offsetLeft < 7) && (editorWidthPercent = 0);
      ( ev.pageX - this.editor.offsetLeft - this.content.offsetWidth > -7) && (editorWidthPercent = 100);
      this.editor.style.flexBasis = `${editorWidthPercent}%`;
      this.preview.style.flexBasis = `${100 - editorWidthPercent}%`;

    };
    document.addEventListener('mousemove', handleMouseMove);

    document.addEventListener('mouseup', function (e) {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  }
  onDoubleClickHandle(){
    this.editor.style.transition = 'flex-basis ease 200ms';
    this.preview.style.transition = 'flex-basis ease 200ms';
    setTimeout(() => {
      this.editor.style.transition = '';
      this.preview.style.transition = '';
    },200);
    if(this.preview.offsetWidth){
      this.editor.style.flexBasis = '100%';
      this.preview.style.flexBasis = 0;
    }else {
      this.editor.style.flexBasis = '50%';
      this.preview.style.flexBasis = '50%';
    }
  }
  render() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      // highlight: function (code) {
      //   console.log(code);
      //   return require('highlight').highlightAuto(code).value;
      // }
    });
    return (
      <div className="EditArea">
        <Header className="head-wrap">
          <div className="head">
            <h1 className="title-wrapper"><input className="title" type="text" value={this.state.title} onChange={this.titleChangeHandle.bind(this)}/></h1>
            <div className="button-wrapper">
              <Button type="primary" onClick={this.saveClickHandle} ghost>保存</Button>
            </div>
            <div className="toolbar"></div>
          </div>
        </Header>
        <div ref={(ref)=>this.content=ref} className="content">
          <div ref={(ref)=>this.editor=ref}  className="editor" data-scrollbar><textarea ref={(ref)=>this.textarea=ref} className="textarea" id="mdEditor" width={200} value={this.state.markdownContent} /></div>
          <div ref={(ref)=>this.dragbar=ref} className="drag-bar" onMouseDown={this.onMouseDownHandle.bind(this)} onDoubleClick={this.onDoubleClickHandle.bind(this)}/>
          <div ref={(ref)=>this.preview=ref} data-scrollbar className="preview"><div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(this.state.markdownContent)}} /></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {activeFile} = state;
  return {activeFile};
};
const mapDispatchToProps = {
  saveFile
};
export default connect(mapStateToProps, mapDispatchToProps)(EditArea);