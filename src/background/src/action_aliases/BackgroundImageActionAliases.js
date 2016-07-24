import {
  FETCH_BACKGROUND_IMAGE
} from '../action_types/BackgroundImageActionTypes';
import BackgroundImageActionCreators from '../action_creators/BackgroundImageActionCreators';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const fetchBackgroundImage = () => {
  return (dispatch) => {
    dispatch(BackgroundImageActionCreators.fetching());

    http.get(endpoints.photos)
      .then((response) => {
        const image = response.hits[Math.floor(Math.random() * response.hits.length)];
        // TODO: Cache images in chrome.storage and rotate daily, removing one from array everyday
        dispatch(BackgroundImageActionCreators.fetchSuccess(image.webformatURL));
      })
      .catch((response) => {
        debugger;
      });
  }
};

export default {
  [FETCH_BACKGROUND_IMAGE]: fetchBackgroundImage
};
