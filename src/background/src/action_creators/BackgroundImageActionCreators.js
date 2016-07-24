import {
  FETCH_BACKGROUND_IMAGE,
  FETCH_BACKGROUND_IMAGE_PENDING,
  FETCH_BACKGROUND_IMAGE_SUCCESS,
  SET_NEW_BACKGROUND_IMAGE,
  SET_NEW_BACKGROUND_IMAGE_SUCCESS
} from '../action_types/BackgroundImageActionTypes';

export default {

  fetch() {
    return {
      type: FETCH_BACKGROUND_IMAGE
    };
  },

  fetching() {
    return {
      type: FETCH_BACKGROUND_IMAGE_PENDING
    };
  },

  fetchSuccess(image) {
    return {
      type: FETCH_BACKGROUND_IMAGE_SUCCESS,
      data: {image}
    };
  },

  setNewImage(images) {
    return {
      type: SET_NEW_BACKGROUND_IMAGE,
      // This must be named payload for `react-chrome-redux` because
      // this action will be intercepted by an alias
      payload: {images}
    };
  },

  setNewImageSuccess(image) {
    return {
      type: SET_NEW_BACKGROUND_IMAGE_SUCCESS,
      data: {image}
    };
  }

};
