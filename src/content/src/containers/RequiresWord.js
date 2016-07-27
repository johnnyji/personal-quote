import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import getHoursDiff from '../utils/getHoursDiff';
import WordsActionCreators from '../../../background/src/action_creators/WordsActionCreators';

export default (ComposedComponent) => {

  class RequiresWord extends Component {

    static displayName = 'RequiresWord';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetched: PropTypes.bool.isRequired,
      fetching: PropTypes.bool.isRequired,
      word: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        word: PropTypes.string.isRequired
      })
    };

    componentWillMount() {
      const {word, fetching} = this.props;
      const hasWord = word && word.url && word.createdAt;
      const currentTime = new Date().toISOString();

      // If we're already fetching for more words, don't do anything
      if (fetching) return;

      // If there's no current word, load it in from storage
      if (!hasWord) {
        this._loadNewWordOfTheDay();
        return;
      }

      // If theres a current word and its expired. We want to replace it with a new word
      if (hasWord && getHoursDiff(word.createdAt, currentTime) > 8) {
        this._loadNewWordOfTheDay();
        return;
      }
    }

    render() {
      const {word, fetched, fetching, ...restProps} = this.props;

      if (fetching && !fetched) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} word={word} />;
    }
  
    /**
     * Loads a new word of the day into the extension
     */
    _loadNewWordOfTheDay = () => {
      const {dispatch} = this.props;
      
      chrome.storage.sync.get('words', ({words: cachedWords}) => {

        // If we're out of cached words, we need to fetch more from the API
        if (!Array.isArray(cachedWords) || !cachedWords.length) {
          dispatch(WordsActionCreators.fetch());
          return;
        }
        
        // Sets a new word of the day with the existing cached words
        dispatch(WordsActionCreators.fetchSuccess(cachedWords));
      });
    };

  }
  
  return connect((state) => ({
    fetched: state.words.fetched,
    fetching: state.words.fetching,
    word: state.words.word
  }))(RequiresWord);
};
