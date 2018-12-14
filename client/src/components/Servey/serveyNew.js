import React, {Component} from 'react';
import ServeyForm from './serveyForm';
import SurveyFormReview from './SurveyFormReview'
import {reduxForm} from 'redux-form';

class ServeyNew extends Component{
  state = {surveyFormReview : false}

  renderContent(){
    if(this.state.surveyFormReview){
      return <SurveyFormReview onCancle={()=>this.setState({surveyFormReview : false})} />
    }
      return <ServeyForm onSubmit={()=>this.setState({surveyFormReview : true})}/>
  }

  render(){
    return(
      <div>
      {this.renderContent()}
      </div>
    )
  }
}

export default reduxForm({
  form : 'serveyForm'
})(ServeyNew);
