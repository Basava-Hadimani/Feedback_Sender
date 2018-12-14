import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class DashBoard extends Component{
  render(){
    return (
      <div className="fixed-action-btn">
      <Link to="/survey/new" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></Link>
      </div>
    )
  }
}

export default DashBoard;
