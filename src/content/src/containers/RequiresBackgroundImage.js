import React, {Component, PropTypes} from 'react';
import BackgroundImageActionCreators from '../../../background/src/action_creators/BackgroundImageActionCreators';
import {connect} from 'react-redux';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import getHoursDiff from '../utils/getHoursDiff';

export default (ComposedComponent) => {

  class RequiresBackgroundImage extends Component {

    static displayName = 'RequiresBackgroundImage';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
      backgroundImage: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    };

    componentWillMount() {
      const {backgroundImage, fetching} = this.props;
      const hasBackgroundImage = backgroundImage && backgroundImage.url && backgroundImage.createdAt;
      const currentTime = new Date().toISOString();

      // If we're already fetching for background pictures, don;t do anything
      if (fetching) return;

      // If there's no background image, load it in from storage
      if (!hasBackgroundImage) {
        this._loadNewBackgroundPicture();
        return;
      }

      // If theres a background image and its expired. We want to replace it with a new background image
      if (hasBackgroundImage && getHoursDiff(currentTime, backgroundImage.createdAt) > 5) {
        this._loadNewBackgroundPicture();
        return;
      }
    }

    render() {
      const {backgroundImage, fetched, fetching, ...restProps} = this.props;

      if (fetching && !fetched) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} backgroundImageUrl={backgroundImage.url} />;
    }
  
    /**
     * Loads a new background picture into the extension
     */
    _loadNewBackgroundPicture = () => {
      const {dispatch} = this.props;
      
      chrome.storage.sync.get('backgroundImageUrls', (response) => {
        const {backgroundImageUrls: cachedImages} = response;
        
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
