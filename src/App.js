import React, {Component} from 'react';
import Scrollbar from 'react-perfect-scrollbar';
// import Scrollbar from 'react-custom-scrollbars';
// import Scrollbar from 'react-scrollbar';
import logo from './logo.svg';
import './App.css';
import {Layout, Menu, Icon} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{
          '-webkit-app-region': 'drag',
          position: 'fixed',
          width: '100%',
          background: '#108ee9'
        }}>
          <div style={{position:'absolute',right: '5px',top:'5px',lineHeight:'20px'}}>
            <Icon type="minus"  style={{ fontSize: 16, color: '#fff',margin:'5px' }} />
            <Icon type="close" style={{ fontSize: 16, color: '#fff',margin:'5px' }} />
          </div>
        </Header>
        <Layout style={{background: '#fff'}}>
          <Sider width={200} style={{
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            marginTop: '64px',
            position: 'fixed',
            left: 0,
            background: '#fff',
          }}>

            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%'}}
            >
              <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{padding: '0 24px', background: '#eee', margin: '64px 0 0 200px'}}>
            main content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
