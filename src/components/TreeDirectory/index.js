import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Icon, Menu, Dropdown } from 'antd';
const {Header, Content} = Layout;
const SubMenu = Menu.SubMenu;
import {newFile, newFolder, setActiveFolder} from '../../actions';
import {CREATE_MENU} from '../../constants';
import './index.css'

class TreeDirectory extends Component {
  constructor(props){
    super(props);
    let {setActiveFolder, activeFolderPath, activeFilePath} = this.props;
    setActiveFolder(activeFolderPath,activeFilePath);
  }
  generateMenu(menus,path=''){
    return menus.map(menu => {
      let key = `${path}/${menu.name}`;
      return ([
          menu.type === 'folder' ?
            <Menu.Item key={key}>
              <Icon type={menu.icon}/><span>{menu.name}</span>
            </Menu.Item>
            : null,
          menu.children && menu.children.some(c => c.type === 'folder') ?
            <SubMenu key={`${key}/`} className="sub-menu">
              {this.generateMenu(menu.children, key)}
            </SubMenu>
            : null
        ]
      )
    });
  }
  onSelectHandle = ({key}) => {
    this.props.setActiveFolder(key);
  };
  onMenuSelectHandle = ({key}) => {
    this.props.newFile(CREATE_MENU[key]);
  };
  render() {
    let {data,activeFolderPath} = this.props;
    const menu = (
      <Menu className="new-menu" onClick={this.onMenuSelectHandle} selectable={false}>
        {
          CREATE_MENU.map((menu,i)=>{
            return <Menu.Item key={i}><Icon className="icon" type={menu.icon} />{menu.name}</Menu.Item>
          })
        }
      </Menu>
    );
    return (
      <Layout data-scrollbar className="TreeDirectory scrollbar">
        <Header className="head">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon className="icon plus" type="plus"/>
              {!this.props.sideCollapsed ? <span>新建<Icon className="icon caret-down" type="caret-down"/></span> : ''}
            </a>
          </Dropdown>
        </Header>
        <Content>
          <Menu
            defaultSelectedKeys={[activeFolderPath]}
            defaultOpenKeys={[`/${data[0].name}/`]}
            mode="inline"
            theme="light"
            inlineCollapsed={this.props.sideCollapsed}
            onSelect={this.onSelectHandle}
            selectedKeys={[activeFolderPath]}
            className="menu-list">
            {this.generateMenu(data)}
          </Menu>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  let {data, status} = state;
  let {sideCollapsed,activeFolderPath,activeFilePath} = status;
  return {data, sideCollapsed,activeFolderPath,activeFilePath};
};
const mapDispatchToProps = {
  newFile,
  newFolder,
  setActiveFolder
};
export default connect(mapStateToProps, mapDispatchToProps)(TreeDirectory);