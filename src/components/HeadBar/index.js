import React, {Component} from 'react';
import {Icon} from 'antd';
import './index.css'

import {PLATFORM} from '../../constants';

export default class HeadBar extends Component {
  constructor(props) {
    super(props);
    this.setting.bind(this);
    this.min.bind(this);
    this.max.bind(this);
    this.close.bind(this);
  }

  setting() {

  }

  min() {
    window.require('electron').ipcRenderer.send('minimize-win');
  }

  max() {
    window.require('electron').ipcRenderer.send('maximize-win');
  }

  close() {
    window.require('electron').ipcRenderer.send('close-win');
  }

  render() {
    return (
      <div style={{'-webkit-app-region': 'no-drag'}} onDoubleClick={this.max} className="HeadBar">
        {
          PLATFORM==='win32'? [
            <Icon className="icon" key="min" onClick={this.min} type="minus"/>,
            <Icon className="icon max" key="max" onClick={this.max} type="plus-square-o"/>,
            <Icon className="icon" key="close" onClick={this.close} type="close"/>,
          ] :null
        }
      </div>
    );
  }
}