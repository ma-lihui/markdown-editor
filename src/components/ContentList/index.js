import React, {Component} from 'react';
import { Input, Icon, Layout, Menu, Dropdown } from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import './index.css'
const Search = Input.Search;

export default class ContentList extends Component{
  toggle = () => {
    this.props.toggleSider();
  };
  render(){
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
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
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
        <Content>
          <Menu className="menu-list">
            <Menu.Item  key="1" className="content-wrapper">
              <h3 className="title">title</h3>
              <div className="detail">我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。
                此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）。
                引入 react-app-rewired 并修改 package.json 里的启动配置。
              </div>
              <p> </p>
            </Menu.Item>
            <Menu.Item  key="2" className="content-wrapper">
              <h3 className="title">title2</h3>
              <div className="detail">认配置进行自定义
              </div>
              <p> </p>
            </Menu.Item>
          </Menu>
        </Content>
        <Footer className="footer">
          <p>共3项</p>
        </Footer>
      </Layout>
    );
  }
}