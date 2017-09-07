import React, {Component} from 'react';
import Scrollbar from 'smooth-scrollbar';
import logo from './logo.svg';
import './App.css';
import HeadBar from './components/HeadBar'
import TreeDirectory from './components/TreeDirectory'
import ContentList from './components/ContentList'
import EditArea from './components/EditArea'
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


class App extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount(){
      Scrollbar.initAll({
          speed: 3,
          damping: 0.2,
          overscrollEffect: 'bounce'
      });
  }

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header style={{
          '-webkit-app-region': 'drag',
          width: '100%',
          background: '#108ee9'
        }}>
          <HeadBar/>
        </Header>
        <Layout style={{background: '#fff'}}>
          <Sider style={{background: '#fff'}} trigger={null} collapsible collapsed={this.state.collapsed} collapsedWidth="64">
            <TreeDirectory collapsed={this.state.collapsed}/>
          </Sider>
          <Sider width={300}>
            <ContentList toggleSider={this.toggleSider} collapsed={this.state.collapsed}/>
          </Sider>
          <Content><EditArea/></Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
