import {PropTypes} from 'react';

export default {

  word: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    definitions: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    word: PropTypes.string.isRequired
  })

};
