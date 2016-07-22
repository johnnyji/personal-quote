import createReducer from 'create-reducer-redux';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  currentUser: null
});

export default createReducer(initialState, {

  name: 'Auth',

  handlers: [
    onAuth: ActionTypes.AUTH_SUCCESS
  ],

  onAuth(state, {currentUser}) {
    return state.set('currentUser', Immutable.fromJS(currentUser));
  }

});
