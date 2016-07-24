import {
  FETCH_BACKGROUND_IMAGE,
  SET_NEW_BACKGROUND_IMAGE
} from '../action_types/BackgroundImageActionTypes';
import BackgroundImageActionCreators from '../action_creators/BackgroundImageActionCreators';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const fetchBackgroundImage = () => {
  return (dispatch) => {
    dispatch(BackgroundImageActionCreators.fetching());

    http.get(endpoints.photos)
      .then((response) => {
        const [image, ...restImages] = response.hits.map((hit) => hit.webformatURL);

        // Cache images in the chrome storage
        chrome.storage.sync.set({backgroundImageUrls: restImages}, () => {
          const currentBackgroundImage = {
            createdAt: new Date().toISOString(),
            url: image
          };
          dispatch(BackgroundImageActionCreators.fetchSuccess(currentBackgroundImage));
        });
      })
      .catch((response) => {
        debugger;
      });
  };
};

const setBackgroundImage = ({payload: {images}}) => {
  return (dispatch) => {
    // Gets a random image from the cached images
    const randIndex = Math.floor(Math.random() * images.length);
    const image = images[randIndex];
    const restCachedImages = images.slice(0, randIndex).concat(images.slice(randIndex + 1, images.length));

    const newBackgroundImage = {
      createdAt: new Date().toISOString(),
      url: image
    };

    // Here we set a new background image, whilst simultaniously removing it
    // from the array of cached images so we don't set it again
    chrome.storage.sync.set({backgroundImageUrls: restCachedImages}, () => {
      dispatch(BackgroundImageActionCreators.setNewImageSuccess(newBackgroundImage));
    });
  };
};

export default {
  [FETCH_BACKGROUND_IMAGE]: fetchBackgroundImage,
  [SET_NEW_BACKGROUND_IMAGE]: setBackgroundImage
};
