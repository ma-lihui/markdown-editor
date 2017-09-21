import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleSide} from './actions'
import Scrollbar from 'smooth-scrollbar';
import logo from './logo.svg';
import './App.css';
import HeadBar from './components/HeadBar'
import TreeDirectory from './components/TreeDirectory'
import ContentList from './components/ContentList'
import EditArea from './components/EditArea'
import { Layout } from 'antd';
import 'smooth-scrollbar/dist/smooth-scrollbar.css'

const {Header, Content, Sider} = Layout;


class App extends Component {
  componentDidMount(){
    Scrollbar.initAll({
      speed: 2,
      damping: 0.2,
      // overscrollEffect: 'bounce'
    });
  }

  onCollapseHandle = (collapsed, type) => {
    this.props.toggleSide(collapsed);
  };
  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header className="header" style={{'-webkit-app-region': 'drag'}}>
          <HeadBar/>
        </Header>
        <Layout style={{background: '#fff'}}>
          <Sider style={{background: '#fff'}} defaultCollapsed={this.props.sideCollapsed}
                 onCollapse={this.onCollapseHandle} collapsible>
            <TreeDirectory />
          </Sider>
          <Sider width={300}>
            <ContentList />
          </Sider>
          <Content>
            <EditArea />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  let {status} = state;
  let {sideCollapsed} = status;
  return {sideCollapsed};
};
const mapDispatchToProps = {
  toggleSide,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
