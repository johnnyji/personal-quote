import {PropTypes} from 'react';

export default {

  word: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    pronunciation: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired
  })

};
