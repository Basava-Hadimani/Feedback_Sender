import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import serveyField from './surveyfield';
import {Link} from 'react-router-dom';
import _ from 'underscore';
import invalidEmails from '../utils/validateEmail';
import Fields from './surveyFieids';

class ServeyForm extends Component{
  renderField(){
      return _.map(Fields, ({label, name})=>{
        return (
          <Field key={name} type="text" label={label} name={name} component={serveyField}/>
        )
      })
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(()=>this.props.onSubmit())}>
        {this.renderField()}
        <Link to="/survey">
          <button className="red btn-flat white-text">Calcel</button>
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
        Next
        <i className="material-icons right">done</i>
        </button>
      </form>
    )
  }
}

function validate(values){
  let error = {};
  _.each(Fields, ({name, label}) =>{
    if(!values[name]){
      error[name] = `${label} should not be empty`;
    }
  })
  let invalidEmailsList = values.recipients?invalidEmails(values.recipients):null;
  error.recipients = invalidEmailsList?`These emails are invalid: ${invalidEmailsList }`:null;

  return error;
}

export default reduxForm({
  validate,
  form : 'serveyForm',
  destroyOnUnmount:false
})(ServeyForm);
