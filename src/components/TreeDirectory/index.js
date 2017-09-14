import React, {Component} from 'react';
import {connect} from 'react-redux';
import {newMarkdown,newFolder,setActiveFolder} from '../../actions';
import {Layout, Tree, Icon, Menu, Dropdown, Button} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import {getData} from '../../common'
import './index.css'

const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;


class TreeDirectory extends Component {
  state = {
    myFolderOpen: true,
    collapsed: false,
  };


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
            <Menu.Item key="myFolder">
              <Icon type="inbox"/><span>我的文件夹</span>
            </Menu.Item>
            <SubMenu key="subFolder" className={'sub-folder'}>
              {
                this.state.myFolderOpen?
                data.map((n)=>{
                  if(n.type==='folder') {
                    return (
                      <Menu.Item key={n.name}>
                        <Icon type="folder"/><span>{n.name}</span>
                      </Menu.Item>
                    );
                  }
                }):null
              }
            </SubMenu>

            <Menu.Item key="collection">
              <Icon type="star"/><span>收藏</span>
            </Menu.Item>
            <Menu.Item key="pin">
              <Icon type="pushpin"/><span>便签</span>
            </Menu.Item>
            <Menu.Item key="delete">
              <Icon type="delete"/><span>回收站</span>
            </Menu.Item>
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