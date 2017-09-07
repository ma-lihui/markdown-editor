import React, { Component } from 'react';
import {Layout, Tree, Icon, Menu, Dropdown, Button} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
import './index.css'
const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

export  default class TreeDirectory extends Component {
  state = {
    gData,
    expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    collapsed: false,
  };
  onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };
  onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i - 1, 0, dragObj);
      }
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }
    this.setState({
      gData: data,
    });
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    const menu = (
      <Menu>
        <Menu.Item key="0">新建笔记</Menu.Item>
        <Menu.Item key="1">新建MarkDown</Menu.Item>
        <Menu.Item key="2">新建文件夹</Menu.Item>
      </Menu>
    );
    return (
      <Layout className="TreeDirectory scrollbar">
        <Header className="head">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon className="icon plus" type="plus" />
              {!this.props.collapsed?<span>新建<Icon className="icon caret-down" type="caret-down" /></span> :''}
            </a>
          </Dropdown>
        </Header>
        <Content>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed={this.props.collapsed}
            className="menu-list">
            <SubMenu  key="sub1" title={<span><Icon type="inbox" /><span>我的文件夹</span></span>}>
              <Menu.Item key="11">
                <Tree
                  className="draggable-tree"
                  defaultExpandedKeys={this.state.expandedKeys}
                  draggable
                  onDragEnter={this.onDragEnter}
                  onDrop={this.onDrop}
                  showIcon
                >
                  {loop(this.state.gData)}
                </Tree>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="sub2">
              <Icon type="star" /><span>收藏</span>
            </Menu.Item>
            <Menu.Item key="sub3">
              <Icon type="pushpin" /><span>便签</span>
            </Menu.Item>
            <Menu.Item key="sub4">
              <Icon type="delete" /><span>回收站</span>
            </Menu.Item>
          </Menu>

        </Content>

      </Layout>
    );
  }
}
