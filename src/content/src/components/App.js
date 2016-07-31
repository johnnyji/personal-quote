import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
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

  render() {
    const {word} = this.props;
    const topDefinitions = word.definitions
      .sort((a, b) => b.length - a.length)
      .slice(0, 3);

    return (
      <div className={styles.main}>
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

}
