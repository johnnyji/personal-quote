import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';
import RequiresWord from '../containers/RequiresWord';
import RequiresWordCycleElapse from '../containers/RequiresWordCycleElapse';
import styles from '../../scss/App.scss';
import WordsActionCreators from '../../../background/src/action_creators/WordsActionCreators';

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
          <button onClick={this._handleChangeWordCycleElapse}>
            {wordCycleElapse} hours
          </button>
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

  _renderMainContent = () => {
    return (
      <h1 className={styles.word}>
        {this.props.word.word}
      </h1>
    );
  };

  _handleChangeWordCycleElapse = (elapse) => {
    this.props.dispatch(WordsActionCreators.changeWordCycleElapse(elapse));
  };

}
