import React, {Component, PropTypes} from 'react';
import BackgroundImageActionCreators from '../../../background/src/action_creators/BackgroundImageActionCreators';
import {connect} from 'react-redux';
import FullPageSpinner from '../components/ui/FullPageSpinner';

export default (ComposedComponent) => {

  class RequiresBackgroundImage extends Component {

    static displayName = 'RequiresBackgroundImage';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetching: PropTypes.bool.isRequired,
      backgroundImageUrl: PropTypes.string
    };

    componentWillMount() {
      if (!this.props.fetching) {
        debugger;
        this.props.dispatch({type: 'FETCH_BACKGROUND_IMAGE'});

        // this.props.dispatch(BackgroundImageActionCreators.fetch())
        //   .then((response) => {
        //     debugger;
        //   })
        //   .catch((response) => {
        //     debugger;
        //   });
      }
    }

    render() {
      const {fetching, ...restProps} = this.props;

      if (fetching) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} />;
    }
  }
  
  return connect((state) => {
    debugger;
    return {
      fetching: state.backgroundImage.fetching,
      backgroundImageUrl: state.backgroundImage.backgroundImageUrl
    };
  })(RequiresBackgroundImage);
};
