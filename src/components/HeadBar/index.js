import React,{Component} from 'react';
import { Icon } from 'antd';
import './index.css'
export default class HeadBar extends Component{
  constructor(props){
    super(props);
    this.setting.bind(this);
    this.min.bind(this);
    this.max.bind(this);
    this.close.bind(this);
  }
  setting(){

  }
  min(){
    window.require('electron').ipcRenderer.send('minimize-win');
  }
  max(){
    window.require('electron').ipcRenderer.send('maximize-win');
  }
  close(){
    window.require('electron').ipcRenderer.send('close-win');
  }
  render(){
    return (
      <div style={{'-webkit-app-region': 'no-drag'}} className="HeadBar">
        <Icon className="icon" onClick={this.setting} type="setting"/>
        <Icon className="icon" onClick={this.min} type="minus"/>
        <Icon className="icon" onClick={this.max} type="laptop"/>
        <Icon className="icon" onClick={this.close}  type="close"/>
      </div>
    );
  }
}