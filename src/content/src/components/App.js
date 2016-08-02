import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';
import RequiresWord from '../containers/RequiresWord';
import RequiresWordCycleElapse from '../containers/RequiresWordCycleElapse';
import styles from '../../scss/App.scss';
import WordsActionCreators from '../../../background/src/action_creators/WordsActionCreators';
import {WORD_CYCLE_ELAPSES} from '../utils/config';

@RequiresWordCycleElapse
@RequiresWord
@pureRender
export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    word: CustomPropTypes.word.isRequired,
    wordCycleElapse: CustomPropTypes.wordCycleElapse.isRequired
  };

  render() {
    const {word, wordCycleElapse} = this.props;
    const topDefinitions = word.definitions
      .sort((a, b) => b.length - a.length)
      .slice(0, 3);

    return (
      <div className={styles.main}>
        <section className={styles.wordCycleElapse}>
          <span>New word in</span>
          {this._renderWordCycleElapseOptions()}
        </section>
        <main
          className={styles.content}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}>
          {this._renderMainContent()}
          <section>
            {topDefinitions.map((definition, i) => (
              <div className={styles.definition} key={i}>
                <span className={styles.listIcon}>||</span>
                <span>{definition}</span>
              </div>
            ))}
          </section>
        </main>
      </div>
    );
  }

  _renderWordCycleElapseOptions = () => {
    const {wordCycleElapse} = this.props;

    return (
      <select
        onChange={this._handleChangeWordCycleElapse}
        value={wordCycleElapse}>
        {WORD_CYCLE_ELAPSES.map((elapse, i) => (
          <option disabled={elapse === wordCycleElapse} key={i} value={elapse}>
            {elapse} {elapse === 1 ? 'hour' : 'hours'}
          </option>
        ))}
      </select>
    );
  };

  _renderMainContent = () => {
    return (
      <h1 className={styles.word}>
        {this.props.word.word}
      </h1>
    );
  };

  _handleChangeWordCycleElapse = ({target: {value}}) => {
    this.props.dispatch(WordsActionCreators.changeWordCycleElapse(Number(value)));
  };

}
