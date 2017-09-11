import React, {Component} from 'react';
import marked from 'marked';
import SimpleMDE from 'simplemde';
import  '../../../node_modules/simplemde/dist/simplemde.min.css'
import {Layout, Button, Input, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import './index.css'
export default class EditArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: ""
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      markdownContent: nextProps.data.content
    });
  }
  componentDidMount(){
    let simplemde = new SimpleMDE({ element: document.getElementById("mdEditor") });
    simplemde.value("This text will appear in the editor");
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
        </Header>
        <div className="content">
          <div  className="editor"><textarea id="mdEditor" style={{display:'none'}} ></textarea></div>
          <div data-scrollbar className="preview"><div dangerouslySetInnerHTML={{__html: marked(this.state.markdownContent)}}></div></div>
        </div>
      </div>
    );
  }
}