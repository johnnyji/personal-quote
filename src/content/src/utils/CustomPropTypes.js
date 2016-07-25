import {PropTypes} from 'react';

export default {

  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  })

};
