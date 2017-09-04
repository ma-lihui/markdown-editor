import React,{Component} from 'react';
import { Icon } from 'antd';
import './index.css'
export default class HeadBar extends Component{
  render(){
    return (
      <div className="HeadBar">
        <Icon className="icon" type="setting"/>
        <Icon className="icon" type="down-square-o"/>
        <Icon className="icon" type="minus"/>
        <Icon className="icon" type="close"/>
      </div>
    );
  }
}