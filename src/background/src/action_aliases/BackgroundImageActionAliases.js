import {
  FETCH_BACKGROUND_IMAGE
} from '../action_types/BackgroundImageActionTypes';
import endpoints from '../utils/http/endpoints';
import http from '../utils/http';

const fetchBackgroundImage = (action) => {
  return http.get(endpoints.photos);
};

export default {
  // [FETCH_BACKGROUND_IMAGE]: fetchBackgroundImage
};
