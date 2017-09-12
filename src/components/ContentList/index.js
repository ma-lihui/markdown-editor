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
  onSelectHandle = ({item, key}) => {
    this.props.changeContentList(this.props.data[key]);
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
        <Content data-scrollbar>
          <Menu onSelect={this.onSelectHandle} className="menu-list">
            {
              this.props.data.map(function (n,i) {
                return (
                  <Menu.Item  key={i} className="content-wrapper">
                    <h3 className="title">{n.title}</h3>
                    <div className="detail">{n.content}</div>
                    <p>{n.date} </p>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Content>
        <Footer className="footer">
          <p>共{this.props.data.length}项</p>
        </Footer>
      </Layout>
    );
  }
}