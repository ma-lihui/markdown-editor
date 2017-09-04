import React, {Component} from 'react';
import Scrollbar from 'react-perfect-scrollbar';
// import Scrollbar from 'react-custom-scrollbars';
// import Scrollbar from 'react-scrollbar';
import logo from './logo.svg';
import './App.css';
import {Layout, Menu, Icon} from 'antd';
import HeadBar from './components/HeadBar'
import TreeDirectory from './components/TreeDirectory'
import ContentList from './components/ContentList'
import EditArea from './components/EditArea'
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
          <HeadBar/>
        </Header>
        <Layout style={{background: '#fff'}}>
          <TreeDirectory/>
          <ContentList/>
          <EditArea/>
        </Layout>
      </Layout>
    );
  }
}

export default App;
