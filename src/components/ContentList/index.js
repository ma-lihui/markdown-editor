import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setActiveFolder, setActiveFile} from '../../actions';

import { Input, Icon, Layout, Menu, Dropdown } from 'antd';
const {Header, Content, Footer } = Layout;
import './index.css'
const Search = Input.Search;

class ContentList extends Component{
  onSelectHandle = ({key}) => {
    this.props.setActiveFile(key);
  };
  render(){
    let {activeFolderPath,activeFilePath} = this.props;
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
          <Icon className="left-icon" type="rollback" />
          <Search
            className="Search"
            placeholder="input search text"
            onSearch={value => console.log(value)}
          />
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="ant-dropdown-link">
              <Icon className="icon bars" type="bars" />
              {/*<Icon className="icon caret-down" type="caret-down" />*/}
            </span>
          </Dropdown>
        </Header>
        <Content data-scrollbar>
          <Menu onSelect={this.onSelectHandle} selectedKeys={[activeFilePath]} className="menu-list">
            {
              this.props.activeFolder.map(function (n) {
                return (
                  <Menu.Item key={n.name} className="content-wrapper">
                    <h3 className="title">
                      {
                        n.type==='folder' ?
                        <a><Icon type="folder" />{n.name}</a>
                        : <span><Icon type="file-text" />{n.name}</span>
                      }
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
  setActiveFile
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentList);