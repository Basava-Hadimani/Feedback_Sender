import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './header';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing'
import DashBoard from './Dashbord'
import Survey from './Servey/serveyNew'

class App extends Component{

  componentDidMount(){
    this.props.fetchUser();
  }
  render(){
    return (
      <BrowserRouter>
        <div className="container">
        <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/survey" component={DashBoard} />
          <Route path="/survey/new" component={Survey} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
