import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomPropTypes from '../utils/CustomPropTypes';
import {DEFAULT_WORD_CYCLE_ELAPSE} from '../utils/config';
import FullPageSpinner from '../components/ui/FullPageSpinner';
import WordsActionCreators from '../../../background/src/action_creators/WordsActionCreators';

export default (ComposedComponent) => {

  class RequiresWordCycleElapse extends Component {

    static displayName = 'RequiresWordCycleElapse';

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      wordCycleElapse: CustomPropTypes.wordCycleElapse
    };

    componentWillMount() {
      // If there was no word cycle elapse, try to see if theres one in storage
      if (!this.props.wordCycleElapse) {
        chrome.storage.sync.get('wordCycleElapse', ({wordCycleElapse}) => {
          // If theres nothing in storage, we need to default it
          if (!wordCycleElapse) {
            this.props.dispatch(WordsActionCreators.changeWordCycleElapse(DEFAULT_WORD_CYCLE_ELAPSE));
            return;
          }
          // If there is a word cycle elapse in storage, we need to set it in store
          this.props.dispatch(WordsActionCreators.changeWordCycleElapseSuccess(wordCycleElapse));
        });
      }
    }

    render() {
      const {wordCycleElapse, ...restProps} = this.props;

      if (!wordCycleElapse) return <FullPageSpinner />;

      return <ComposedComponent {...restProps} wordCycleElapse={wordCycleElapse} />;
    }
  }
  
  return connect((state) => ({
    wordCycleElapse: state.words.wordCycleElapse
  }))(RequiresWordCycleElapse);
};
