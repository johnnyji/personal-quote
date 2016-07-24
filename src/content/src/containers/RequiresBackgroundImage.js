import React, {Component, PropTypes} from 'react';
import BackgroundImageActionCreators from '../../../background/src/action_creators/BackgroundImageActionCreators';
import {connect} from 'react-redux';
import FullPageSpinner from '../components/ui/FullPageSpinner';

export default (ComposedComponent) => {

  class RequiresBackgroundImage extends Component {

    static displayName = 'RequiresBackgroundImage';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
      backgroundImageUrl: PropTypes.string
    };

    componentWillMount() {
      if (!this.props.fetching) {
        this.props.dispatch(BackgroundImageActionCreators.fetch());
      }
    }

    render() {
      const {fetched, fetching, ...restProps} = this.props;

      if (fetching || !fetched) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} />;
    }
  }
  
  return connect((state) => ({
    fetched: state.backgroundImage.fetched,
    fetching: state.backgroundImage.fetching,
    backgroundImageUrl: state.backgroundImage.backgroundImageUrl
  }))(RequiresBackgroundImage);
};
