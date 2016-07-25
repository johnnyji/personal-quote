import React, {Component, PropTypes} from 'react';
import AuthActionCreators from '../../../background/src/action_creators/AuthActionCreators';
import {connect} from 'react-redux';

export default (ComposedComponent) => {

  class RequiresMediumAuth extends Component {

    static displayName = 'RequiresMediumAuth';

    static propTypes = {
      currentUser: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
      const {currentUser} = this.props;

      if (!currentUser) {
        this._fetchCurrentUser();
        return;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

    _fetchCurrentUser = () => {
      chrome.storage.sync.get('currentUser', ({currentUser}) => {
        if (!currentUser) {
          this.props.dispatch(AuthActionCreators.authMedium());
        }

        // If the current user exists in our synced storage but not our state,
        // we just add it to our state
        this.props.dispatch(AuthActionCreators.authMediumSuccess(currentUser));
      });
    };
  }
  
  return connect((state) => ({
    currentUser: state.auth.currentUser
  }))(RequiresMediumAuth);
};
