import React, {Component} from 'react';
import LzEditor from 'react-lz-editor';
import {Layout, Button, Input, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import './index.css'

export default class EditArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1>
                <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
      markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
      responseList: []
    };
    this.receiveHtml = this.receiveHtml.bind(this);
  }

  receiveHtml(content) {
    console.log("recieved HTML content", content);
  }

  receiveMarkdown() {

  }

  render() {
    let policy = "";
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: (file) => {

      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    };
    return (
      <div className="EditArea">
        <Header className="head">
          <h1 className="title" contentEditable> Title </h1>
          <div className="button-wrapper">
            <Button type="primary" ghost>保存</Button>
          </div>
        </Header>
        <LzEditor
          className="editor"
          active={true}
          importContent={this.state.markdownContent}
          cbReceiver={this.receiveMarkdown}
          image={false}
          video={false}
          audio={false}
          convertFormat="markdown"/>
      </div>
    );
  }
}