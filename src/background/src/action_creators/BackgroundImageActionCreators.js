import {
  FETCH_BACKGROUND_IMAGE,
  FETCH_BACKGROUND_IMAGE_PENDING
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
  }

};
