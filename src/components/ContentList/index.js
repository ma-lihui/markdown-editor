import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setActiveFolder, setActiveFile, deleteFile, collectFile} from '../../actions';

import { Input, Icon, Layout, Menu, Dropdown } from 'antd';
const {Header, Content, Footer } = Layout;
import './index.css'
const Search = Input.Search;

class ContentList extends Component{
  onSelectHandle = ({key}) => {
    this.props.setActiveFile(key);
  };
  onFileMenuSelectHandle = ({key})=>{
    // this.props.deleteFile(key);
  };
  setActiveFolderHandle = (folderName, i)=>{
    this.props.setActiveFolder(`${this.props.activeFolderPath}/${folderName}`);
  }
  backFolder = ()=>{
    let pathArr = this.props.activeFolderPath.split('/');
    pathArr.pop();
    if(pathArr.length>1){
      this.props.setActiveFolder(pathArr.join('/'))
    }
  }
  render(){
    let {activeFolderPath, activeFilePath, deleteFile, collectFile} = this.props;
    let pathArr = activeFolderPath.split('/');
    pathArr.pop();
    const menu = (
      <Menu>
        <Menu.Item key="0">创建时间</Menu.Item>
        <Menu.Item key="1">修改时间</Menu.Item>
        <Menu.Item key="2">文件名称</Menu.Item>
        <Menu.Item key="3">文件大小</Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{background: '#fff'}} className="ContentList">
        <Header className="head">
          <a onClick={this.backFolder} className={pathArr.length>1?'back-folder':'back-folder disable'}><Icon className="left-icon" type="rollback"/></a>
          <Search
            className="Search"
            placeholder="input search text"
            onSearch={value => console.log(value)}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link">
              <Icon className="icon bars" type="bars" />
              {/*<Icon className="icon caret-down" type="caret-down" />*/}
            </a>
          </Dropdown>
        </Header>
        <Content data-scrollbar>
          <Menu onSelect={this.onSelectHandle} selectedKeys={[activeFilePath]} className="menu-list">
            {
              this.props.activeFolder.map((n,i)=>{
                const fileMenu = (
                  <Menu onClick={this.onFileMenuSelectHandle} selectable={false}>
                    {/* <Menu.Item><div onClick={()=>collectFile(i)}><Icon type='star'/>收藏</div></Menu.Item> */}
                    <Menu.Item><div onClick={()=>deleteFile(i)}><Icon type='delete'/> 删除</div></Menu.Item>
                  </Menu>
                )
                return (
                  <Menu.Item key={n.name} className="content-wrapper">
                    <h3 className="title">
                      {
                        n.type==='folder' ?
                        <span><a onClick={()=>{this.setActiveFolderHandle(n.name, i)}}><Icon type="folder" />{n.name}</a></span>
                        : <span><Icon type="file-text" />{n.name}</span>
                      }
                      <Dropdown overlay={fileMenu} trigger={['click']}>
                        <a className="ant-dropdown-link popup-trigger" href="#">
                          <Icon type="ellipsis" />
                        </a>
                      </Dropdown>
                    </h3>
                    <div className="detail">{n.content}</div>
                    <p>{n.date}</p>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Content>
        <Footer className="footer">
          <p>共{this.props.activeFolder.length}项</p>
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  let { activeFolder, status } = state;
  let {activeFolderPath,activeFilePath} = status;
  return { activeFolder, activeFolderPath, activeFilePath };
};
const mapDispatchToProps = {
  setActiveFolder,  
  setActiveFile,
  deleteFile,
  collectFile,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentList);