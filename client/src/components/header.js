import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payment from './Payments'

class Header extends Component{
  renderContent(){
    switch (this.props.auth) {
      case null:
        return "Pending";
        break;
      case false :
        return (<li><a href="/auth/google">Login with Google</a></li>);
        break;
      default:
        return [
          <li key={1}><Payment /></li>,
          <li key={3} style={{margin : '0 10px'}}>Credits : {this.props.auth.credits?this.props.auth.credits:0}</li>,
          <li key={2}><a href="/api/logout">Logout</a></li>
        ];
    }
  }
  render(){
    console.log(this.props);
        return(
          <nav>
           <div className="nav-wrapper">
             <Link to={this.props.auth?'/survey':'/'}>Emaily</Link>
             <ul id="nav-mobile" className="right hide-on-med-and-down">
               {this.renderContent()}
             </ul>
           </div>
         </nav>
        );
  }
}
function mapStateToProps(state){
  return ({
    auth : state.auth
  })
}

export default connect(mapStateToProps)(Header);
