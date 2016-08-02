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
      word: CustomPropTypes.word,
      wordCycleElapse: CustomPropTypes.wordCycleElapse.isRequired
    };

    componentWillMount() {
      const {dispatch, fetching, word, wordCycleElapse} = this.props;
      const currentTime = new Date().toISOString();

      if (fetching) {
        console.log('Already fetching');
        return;
      }
      // If the word has not yet expired
      if (word && getHoursDiff(currentTime, word.createdAt) <= wordCycleElapse) {
        console.log(`There is a word, and it has been active for ${getHoursDiff(currentTime, word.createdAt)} and has NOT expired`);
        return;
      }
      // If the word has expired
      if (word && getHoursDiff(currentTime, word.createdAt) > wordCycleElapse) {
        console.log(`There is a word, and it has been active for ${getHoursDiff(currentTime, word.createdAt)} and has BEEN expired, should load new word`);
        this._loadNewWordOfTheDay();
      }

      // Because accessing chrome storage is asynchronous, it may be delayed beyond the initial
      // render cycle, therefore we must start fetching beforehand so the user will see a spinner
      // as we're trying to access data
      dispatch(WordsActionCreators.fetching());

      chrome.storage.sync.get('currentWord', ({currentWord: word}) => {
        const hasWord = word && word.definitions && word.createdAt;

        if (!hasWord) {
          console.log('No current word from storage, load new word');
          this._loadNewWordOfTheDay();
          return;
        }

        // If theres a current word and its expired. We want to replace it with a new word
        if (hasWord && getHoursDiff(currentTime, word.createdAt) > wordCycleElapse) {
          console.log(`There is current word in storage, its been active for ${getHoursDiff(currentTime, word.createdAt)}, load new word`);
          this._loadNewWordOfTheDay();
          return;
        }

        console.log('Word loaded from storage, set word in reducer state');
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
          console.log('No cached words, gotta fetch a whole new set of words');
          dispatch(WordsActionCreators.fetch());
          return;
        }
        
        console.log(`There are ${cachedWords.length} cached words, use them to set current word`);
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
