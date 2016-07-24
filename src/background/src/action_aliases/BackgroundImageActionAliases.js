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
            createdAt: new Date(),
            url: image
          };
          // Set the current image in chrome storage, but also keep a `created` timestamp
          // so we know when to rotate images
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

const setBackgroundImage = () => {
  return (dispatch) => {
    const [image, ...restImages] = chome.storage.sync.get('backgroundImageUrls');
    const currentBackgroundImage = {
      createdAt: new Date(),
      url: image
    };

    chrome.storage.sync.set({backgroundImageUrls: restImages}, () => {
      chrome.storage.sync.set({currentBackgroundImage}, () => {
        dispatch(BackgroundImageActionCreators.setNewImageSuccess(currentBackgroundImage));
      });
    });
  };
};

export default {
  [FETCH_BACKGROUND_IMAGE]: fetchBackgroundImage,
  [SET_NEW_BACKGROUND_IMAGE]: setBackgroundImage
};
