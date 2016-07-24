import {
  FETCH_BACKGROUND_IMAGE
} from '../action_types/BackgroundImageActionTypes';
// import createReducer from 'create-reducer-redux';

const initialState = {
  backgroundImageUrl: null,
  fetching: false
};

export default (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case'FETCH_BACKGROUND_IMAGE':
     debugger; 
    default:
      return state;
  }
};
