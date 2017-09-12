import React, {Component} from 'react';
import marked from 'marked';
import SimpleMDE from 'simplemde';
import CodeMirror from 'codemirror';
import  '../../../node_modules/simplemde/dist/simplemde.min.css'
import {Layout, Button, Input, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import './index.css'
import '../../css/github-markdown.css'
export default class EditArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: " "
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      markdownContent: nextProps.data.content
    });
  }
  componentDidMount(){
    let editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'markdown',
      theme: "paper",
      tabSize:  2,
      indentUnit:  2,
      lineNumbers: false,
      allowDropFileTypes: ['text/plain','text/x-markdown'],
      highlightFormatting: true,
      // scrollbarStyle: null,
      lineWrapping: true,
    });
    editor.setValue('# head\n > 1aaa\n > 222');
    // document.getElementsByClassName('CodeMirror')[0].setAttribute('data-scrollbar','')
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
      //   return require('highlight.js').highlightAuto(code).value;
      // }
    });
    return (
      <div className="EditArea">
        <Header className="head">
          <h1 className="title" contentEditable> Title </h1>
          <div className="button-wrapper">
            <Button type="primary" ghost>保存</Button>
          </div>
          <div className="toolbar"> </div>
        </Header>
        <div className="content">
          <div  className="editor"><textarea ref={(ref)=>this.textarea=ref} className="textarea" id="mdEditor" width={200} value={this.state.markdownContent}></textarea></div>
          <div data-scrollbar className="preview"><div className="markdown-body" dangerouslySetInnerHTML={{__html: marked(this.state.markdownContent)}}></div></div>
        </div>
      </div>
    );
  }
}