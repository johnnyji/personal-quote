import {PropTypes} from 'react';

export default {

  image: PropTypes.shape({
    height: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    photographer: PropTypes.string.isRequired,
    src: PropTypes.shape({
      // TODO: Finish PT here
    }).isRequired,
    setAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
  }),

  word: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    definitions: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
    word: PropTypes.string.isRequired
  }),
  
  wordCycleElapse: PropTypes.oneOf([1, 2, 3, 5, 10, 12, 24])

};
