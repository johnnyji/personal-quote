import {
  FETCH_BACKGROUND_IMAGE
} from '../action_types/BackgroundImageActionTypes';
import BackgroundImageActionCreators from '../action_creators/BackgroundImageActionCreators';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const fetchBackgroundImage = (action) => {
  return (dispatch) => {
    dispatch(BackgroundImageActionCreators.fetching());

    http.get(endpoints.photos)
      .then((response) => {
        debugger;
      })
      .catch((response) => {
        debugger;
      });
  }
};

export default {
  [FETCH_BACKGROUND_IMAGE]: fetchBackgroundImage
};
