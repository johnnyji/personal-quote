import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../utils/CustomPropTypes';
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
      word: CustomPropTypes.word
    };

    componentWillMount() {
      const {dispatch, fetching, word} = this.props;

      if (fetching || word) return;

      // Because accessing chrome storage is asynchronous, it may be delayed beyond the initial
      // render cycle, therefore we must start fetching beforehand so the user will see a spinner
      // as we're trying to access data
      dispatch(WordsActionCreators.fetching());

      chrome.storage.sync.get('currentWord', ({currentWord: word}) => {
        const hasWord = word && word.url && word.createdAt;
        const currentTime = new Date().toISOString();

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

        // If we have the word and its still valid, we just set it in store
        dispatch(WordsActionCreators.setNewWordSuccess(word));
      });
    }

    render() {
      const {word, fetched, fetching, ...restProps} = this.props;

      if (fetching || !fetched) return <FullPageSpinner />;

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
        dispatch(WordsActionCreators.setNewWord(cachedWords));
      });
    };

  }
  
  return connect((state) => ({
    fetched: state.words.fetched,
    fetching: state.words.fetching,
    word: state.words.word
  }))(RequiresWord);
};
