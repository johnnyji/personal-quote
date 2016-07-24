import {
  FETCH_BACKGROUND_IMAGE_PENDING,
  FETCH_BACKGROUND_IMAGE_SUCCESS,
} from '../action_types/BackgroundImageActionTypes';
import createReducer from 'create-reducer-redux';

const initialState = {
  backgroundImageUrl: null,
  fetched: false,
  fetching: false
};

export default createReducer(initialState, {

  name: 'BackgroundImage',

  handlers: {
    onFetching: [FETCH_BACKGROUND_IMAGE_PENDING],
    onFetched: [FETCH_BACKGROUND_IMAGE_SUCCESS]
  },

  onFetching(state) {
    return {...state, fetched: false, fetching: true};
  },

  onFetched(state, {image}) {
    return {...state, fetched: true, fetching: false, backgroundImageUrl: image};
  }

});