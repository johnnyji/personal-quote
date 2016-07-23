import {
  FETCH_BACKGROUND_IMAGE,
  FETCH_BACKGROUND_IMAGE_SUCCESS
} from '../action_types/BackgroundImageActionTypes';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';
export default {

  fetch() {
    debugger;
    return (dispatch) => {

      debugger;
      dispatch(this.fetching());

      http.get(endpoints.photos)
        .then((res) => {
          debugger;
        })
        .catch((res) => {
          debugger;
        });
    };
  },

  fetching() {
    return {
      type: FETCH_BACKGROUND_IMAGE
    };
  }

};
