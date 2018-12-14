import React, {Component} from 'react';
import StripeComponent from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payment extends Component{
  render(){
    return(
      <StripeComponent
        name="emaily"
        description="$1 for 1 mail credit"
        amount={500}
        token={(token) => this.props.stripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      <button className="btn">
      Add Credits
      </button>
      </StripeComponent>
    )
  }
}

export default connect(null, actions)(Payment);
