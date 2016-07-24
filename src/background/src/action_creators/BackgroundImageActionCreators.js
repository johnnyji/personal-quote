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

  setNewImage() {
    return {
      type: SET_NEW_BACKGROUND_IMAGE
    };
  },

  setNewImageSuccess(image) {
    return {
      type: SET_NEW_BACKGROUND_IMAGE_SUCCESS,
      data: {image}
    };
  }

};
