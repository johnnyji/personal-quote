import {
  FETCH,
  FETCH_SUCCESS
} from '../action_types/BackgroundImageActionTypes';
import createReducer from 'create-reducer-redux';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  backgroundImageUrl: null,
  fetching: false
});

export default createReducer(initialState, {

  name: 'BackgroundImage',

  handlers: {
    onFetch: [FETCH],
    onFetched: [FETCH_SUCCESS]
  },

  onFetch(state) {
    return state.set('fetching', true);
  },

  onFetched(state) {
    return state.merge({
      fetching: false
    });
  }

});
