import {checkStatus, parseJson} from '../utils/http';
import {
  FETCH_BACKGROUND_IMAGE,
  SET_NEW_BACKGROUND_IMAGE
} from '../action_types/BackgroundImageActionTypes';
import BackgroundImageActionCreators from '../action_creators/BackgroundImageActionCreators';
import config from '../../../../config';
import endpoints from '../utils/http/endpoints';

const fetchBackgroundImage = () => {
  return (dispatch) => {
    dispatch(BackgroundImageActionCreators.fetching());

    debugger;
    fetch(endpoints.photos, {
      headers: {
        Authorization: config.pexels.apiKey
      }
    })
      .then(checkStatus)
      .then(parseJson)
      .then(({photos: [image, ...restImages]}) => {
        // Cache images in the chrome storage
        chrome.storage.sync.set({backgroundImages: restImages}, () => {
          const currentDate = new Date().toISOString();
          const currentBackgroundImage = Object.assign({}, image, {setAt: currentDate});

          // Stores the current background image in storage
          chrome.storage.sync.set({currentBackgroundImage}, () => {
            dispatch(BackgroundImageActionCreators.fetchSuccess(currentBackgroundImage));
          });
        });
      })
      .catch((response) => {
        debugger;
      });
  };
};

const setBackgroundImage = ({payload: {images}}) => {
  return (dispatch) => {
    dispatch(BackgroundImageActionCreators.setNewImagePending());

    // Gets a random image from the cached images
    const randIndex = Math.floor(Math.random() * images.length);
    const image = images[randIndex];
    const restCachedImages = images.slice(0, randIndex).concat(images.slice(randIndex + 1, images.length));

    // Here we set a new background image, whilst simultaniously removing it
    // from the array of cached images so we don't set it again
    chrome.storage.sync.set({backgroundImages: restCachedImages}, () => {
      chrome.storage.sync.set({currentBackgroundImage: image}, () => {
        dispatch(BackgroundImageActionCreators.setNewImageSuccess(image));
      });
    });
  };
};

export default {
  [FETCH_BACKGROUND_IMAGE]: fetchBackgroundImage,
  [SET_NEW_BACKGROUND_IMAGE]: setBackgroundImage
};
