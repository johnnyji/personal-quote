import React, {Component, PropTypes} from 'react';
import BackgroundImageActionCreators from '../../../background/src/action_creators/BackgroundImageActionCreators';
import {connect} from 'react-redux';
import CustomPropTypes from '../utils/CustomPropTypes';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import getHoursDiff from '../utils/getHoursDiff';

export default (ComposedComponent) => {

  class RequiresBackgroundImage extends Component {

    static displayName = 'RequiresBackgroundImage';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
      backgroundImage: CustomPropTypes.image,
    };

    componentWillMount() {
      const {backgroundImage, dispatch, fetching} = this.props;

      if (fetching || backgroundImage) return;

      dispatch(BackgroundImageActionCreators.fetching());

      chrome.storage.sync.get('currentBackgroundImage', ({currentBackgroundImage: backgroundImage}) => {
        const hasBackgroundImage = backgroundImage && backgroundImage.url && backgroundImage.setAt;
        const currentTime = new Date().toISOString();

        // If there's no background image, load it in from storage
        if (!hasBackgroundImage) {
          this._loadNewBackgroundPicture();
          return;
        }

        // If theres a background image and its expired. We want to replace it with a new background image
        if (hasBackgroundImage && getHoursDiff(currentTime, backgroundImage.setAt) > 8) {
          this._loadNewBackgroundPicture();
          return;
        }

        // If we have the background image and it still seems to be valid, we
        // want to set it in the store
        dispatch(BackgroundImageActionCreators.setNewImageSuccess(backgroundImage));
      });
    }


    render() {
      const {backgroundImage, fetched, fetching, ...restProps} = this.props;

      if (fetching || !fetched) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} backgroundImageUrl={backgroundImage.url} />;
    }
  
    /**
     * Loads a new background picture into the extension
     */
    _loadNewBackgroundPicture = () => {
      const {dispatch} = this.props;
      
      chrome.storage.sync.get('backgroundImages', ({backgroundImages: cachedImages}) => {
        // If we're out of cached images, we need to fetch more from the API
        if (!Array.isArray(cachedImages) || !cachedImages.length) {
          dispatch(BackgroundImageActionCreators.fetch());
          return;
        }
        
        // Sets a new background image with the existing cached images
        dispatch(BackgroundImageActionCreators.setNewImage(cachedImages));
      });
    };

  }
  
  return connect((state) => ({
    fetched: state.backgroundImage.fetched,
    fetching: state.backgroundImage.fetching,
    backgroundImage: state.backgroundImage.backgroundImage
  }))(RequiresBackgroundImage);
};
