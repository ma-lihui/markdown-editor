import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newMarkdown,newFolder,setActiveFolder} from '../../actions';
import {Layout, Icon, Menu, Dropdown } from 'antd';
const {Header, Content} = Layout;
const SubMenu = Menu.SubMenu;

import './index.css'


class TreeDirectory extends Component {
  state = {
    collapsed: false,
  };
  generateMenu(menus){
    return menus.map(menu => {
      return ([
          <Menu.Item key={menu.name}>
            <Icon type={menu.icon}/><span>{menu.name}</span>
          </Menu.Item>,
          menu.children ?
            <SubMenu key={`subFolder${menu.name}`} className="sub-menu">
              {this.generateMenu(menu.children)}
            </SubMenu>
            : null
        ]
      )
    });
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  onSelectHandle = ({key}) => {
    this.props.setActiveFolder(key);
  };
  render() {
    let {data} = this.props;
    console.log(this.generateMenu(data));

    const menu = (
      <Menu>
        <Menu.Item key="0">新建笔记</Menu.Item>
        <Menu.Item key="1">新建MarkDown</Menu.Item>
        <Menu.Item key="2">新建文件夹</Menu.Item>
      </Menu>
    );
    return (
      <Layout data-scrollbar className="TreeDirectory scrollbar">
        <Header className="head">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon className="icon plus" type="plus"/>
              {!this.props.collapsed ? <span>新建<Icon className="icon caret-down" type="caret-down"/></span> : ''}
            </a>
          </Dropdown>
        </Header>
        <Content>
          <Menu
            defaultSelectedKeys={['myFolder']}
            defaultOpenKeys={['subFolder']}
            mode="inline"
            theme="light"
            inlineCollapsed={this.props.collapsed}
            onSelect={this.onSelectHandle}
            className="menu-list">
            {this.generateMenu(data)}
          </Menu>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  let { data } = state;
  return { data };
};
const mapDispatchToProps = {
  newMarkdown,
  newFolder,
  setActiveFolder
};
export default connect(mapStateToProps, mapDispatchToProps)(TreeDirectory);