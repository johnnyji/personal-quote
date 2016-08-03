import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import DropdownListItem from './ui/DropdownListItem';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import pureRender from 'pure-render-decorator';
import RequiresWord from '../containers/RequiresWord';
import RequiresWordCycleElapse from '../containers/RequiresWordCycleElapse';
import styles from '../../scss/App.scss';
import WordsActionCreators from '../../../background/src/action_creators/WordsActionCreators';
import {WORD_CYCLE_ELAPSES} from '../utils/config';

const ACTIVE_ELAPSE = {
  backgroundColor: '#0000EE',
  color: '#FFF'
};

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

  state = {
    dropdownIsOpen: false
  };

  render() {
    const {word, wordCycleElapse} = this.props;
    const topDefinitions = word.definitions
      .sort((a, b) => b.length - a.length)
      .slice(0, 3);

    return (
      <div className={styles.main}>
        <section className={styles.wordCycleElapse}>
          <span>New word every</span>
          <button
            className={styles.wordCycleElapseButton}
            onClick={this._handleOpenDropdown}
            ref={this._setDropdownButtonRef}>
            {wordCycleElapse} {wordCycleElapse === 1 ? 'hour' : 'hours'}
          </button>
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
    const {dropdownIsOpen} = this.state;

    const timeOptions = WORD_CYCLE_ELAPSES.map((elapse, i) => (
      <DropdownListItem
        disabled={elapse === wordCycleElapse}
        key={i}
        onSelect={this._handleChangeWordCycleElapse}
        style={elapse === wordCycleElapse ? ACTIVE_ELAPSE : null}
        value={elapse}>
        {elapse} {elapse === 1 ? 'hour' : 'hours'}
      </DropdownListItem>
    ));

    return (
      <Popover
        anchorEl={this.dropdownAnchorElement}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        canAutoPosition={false}
        open={dropdownIsOpen}
        onRequestClose={this._handleCloseDropdown}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        <Menu>{timeOptions}</Menu>
      </Popover>
    );
  };

  _renderMainContent = () => {
    return (
      <h1 className={styles.word}>
        {this.props.word.word}
      </h1>
    );
  };

  _handleChangeWordCycleElapse = (elapse) => {
    this.props.dispatch(WordsActionCreators.changeWordCycleElapse(elapse));

    setTimeout(() => {
      this.setState({dropdownIsOpen: false});
    }, 200);
  };

  _handleCloseDropdown = () => {
    this.setState({dropdownIsOpen: false});
  };

  _handleOpenDropdown = () => {
    this.setState({dropdownIsOpen: true});
  };

  _setDropdownButtonRef = (node) => {
    this.dropdownAnchorElement = node;
  };

}
