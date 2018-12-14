import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () => async dispatch => {
    let res = await axios.get('/api/currentUser');
    console.log(res);
    dispatch ({
        type : FETCH_USER,
        payload : res.data
      })
}

export const stripeToken = (token) => async dispatch =>{
  let res = await axios.post('/api/stripeToken', token);
  dispatch({
    type : FETCH_USER,
    payload : res.data
  })
}

export const sendSurvey = (formValues, history) => async dispatch => {
  let res = await axios.post('/api/survey', formValues);
  history.push('/survey');
  dispatch ({type:FETCH_USER, payload : res.data});
}
