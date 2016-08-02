import {PropTypes} from 'react';
import {WORD_CYCLE_ELAPSES} from './config';

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
  
  wordCycleElapse: PropTypes.oneOf(WORD_CYCLE_ELAPSES)

};
