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
      backgroundImageUrl: PropTypes.shape({
        createdAt: PropTypes.instanceOf(Date).isRequired,
        url: PropTypes.string.isRequired
      })
    };

    componentWillMount() {
      const {dispatch, fetching} = this.props;

      chrome.storage.sync.get('backgroundImageUrls', (images) => {
        chrome.storage.sync.get('currentBackgroundImage', (currentImage) => {
          // Check if the current image is stored
          const hasCurrentImage =
            Object.prototype.hasOwnProperty.call(currentImage, 'url') &&
            Object.prototype.hasOwnProperty.call(currentImage, 'createdAt');

          // If theres no current image and we're not getting more images, we should get more images
          if (!hasCurrentImage && !fetching) {
            dispatch(BackgroundImageActionCreators.fetch());
            return;
          }

          // When there's a current image
          if (hasCurrentImage) {
            // Changes the background image every 5 hours
            const currentImageExpired = getHoursDiff(currentImage.createdAt, new Date()) > 5;

            // We're on the last image, and theres no more images left, we need to refetch
            // all the images
            if (currentImageExpired && !images.length) {
              dispatch(BackgroundImageActionCreators.fetch());
              return;
            }

            // The image is expired, we need to get a new one from our existing images
            if (currentImageExpired && images.length > 0) {
              dispatch(BackgroundImageActionCreators.setNewImage());
            }
          }

        });
      });

    }

    render() {
      const {backgroundImage, fetched, fetching, ...restProps} = this.props;

      if (fetching || !fetched) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} backgroundImageUrl={backgroundImage.url} />;
    }
  }
  
  return connect((state) => ({
    fetched: state.backgroundImage.fetched,
    fetching: state.backgroundImage.fetching,
    backgroundImage: state.backgroundImage.backgroundImage
  }))(RequiresBackgroundImage);
};
