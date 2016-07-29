import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import moment from 'moment';
import pureRender from 'pure-render-decorator';
// import RequiresBackgroundImage from '../containers/RequiresBackgroundImage';
import RequiresWord from '../containers/RequiresWord';
import styles from '../../scss/App.scss';

// @RequiresBackgroundImage
@RequiresWord
@pureRender
export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    word: CustomPropTypes.word.isRequired
  };

  state = {
    hovered: false
  };

  render() {
    const {word} = this.props;

    return (
      <div className={styles.main}>
        <main
          className={styles.content}
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}>
          {this._renderMainContent()}
          <section>
            {word.definitions.slice(0, 3).map((definition, i) => (
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
    if (!this.state.hovered) {
      return (
        <h1 className={styles.word}>
          {this.props.word.word}
        </h1>
      );
    }

    const date = moment();
    const hour = date.format('hh');
    const minute = date.format('mm');

    return (
      <div className={`${styles.word} ${styles.clock}`}>
        <span>{hour}</span>
        <span className={styles.clockDivider}>:</span>
        <span>{minute}</span>
      </div>
    );
  };

  _handleMouseEnter = () => {
    this.setState({hovered: true});
  };

  _handleMouseLeave = () => {
    this.setState({hovered: false});
  };

}
