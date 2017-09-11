import React, {Component} from 'react';
import LzEditor from 'react-lz-editor';
import {Layout, Button, Input, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import './index.css'

export default class EditArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: "",
      responseList: []
    };
    this.receiveHtml = this.receiveHtml.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      markdownContent: nextProps.data.content
    });
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