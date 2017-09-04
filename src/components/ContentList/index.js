import React, {Component} from 'react';
import { Input, Icon } from 'antd';
import './index.css'
const Search = Input.Search;

export default class ContentList extends Component{
  render(){
    return (
      <div className="ContentList">
        <div className="head">
          <Search
            className="Search"
            placeholder="input search text"
            onSearch={value => console.log(value)}
          />
          <Icon className="icon" type="appstore-o" />
        </div>
      </div>
    );
  }
}