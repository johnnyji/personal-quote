import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default (ComposedComponent) => {

  class RequiresMediumAuth extends Component {

    static displayName = 'RequiresMediumAuth';

    static propTypes = {
      currentUser: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
      if (!currentUser) {
        
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  
  return connect((state) => ({
    currentUser: state.auth.currentUser
  }))(RequiresMediumAuth);
};
