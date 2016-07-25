import React, {Component, PropTypes} from 'react';
import AuthActionCreators from '../../../background/src/action_creators/AuthActionCreators';
import {connect} from 'react-redux';

export default (ComposedComponent) => {

  class RequiresFacebookAuth extends Component {

    static displayName = 'RequiresFacebookAuth';

    static propTypes = {
      currentUser: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,
      fetchedUser: PropTypes.bool.isRequired,
      fetchingUser: PropTypes.bool.isRequired
    };

    componentWillMount() {
      if (!this.props.currentUser) {
        chrome.storage.sync.get('currentUser', ({currentUser}) => {
          if (currentUser) {
            this.props.dispatch(AuthActionCreators.authFacebookSuccess(currentUser));
          }
        });
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }
  
  return connect((state) => ({
    currentUser: state.auth.currentUser,
    fetchedUser: state.auth.fetched,
    fetchingUser: state.auth.fetching
  }))(RequiresFacebookAuth);
};
