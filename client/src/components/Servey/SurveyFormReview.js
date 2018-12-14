import React, {Component} from 'react';
import {connect} from 'react-redux';
import Fields from './surveyFieids';
import _ from 'underscore';
import * as actions from '../../actions';
import { withRouter } from "react-router";


class SurveyFormReview extends Component{

  reviewFields(){
    return _.map(Fields, (field)=>{
        return (
          <div key={field.label}>
              <label> {field.label}</label>
              <div>{this.props.formValues[field.name]}</div>
          </div>
        )
    })
  }

  render(){
    return(
      <div>
          <div>Please review your form</div>
          {this.reviewFields()}
          <button className="yellow btn-flat white-text" onClick={()=>this.props.onCancle()} >Back</button>
          <button className="green right btn-flat white-text" onClick={()=>this.props.sendSurvey(this.props.formValues, this.props.history)} >Send
          <i className="material-icons">email</i></button>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state);
  return ({formValues : state.form.serveyForm.values})
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
