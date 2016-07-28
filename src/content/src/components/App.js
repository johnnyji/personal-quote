import React, {Component, PropTypes} from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';
import RequiresBackgroundImage from '../containers/RequiresBackgroundImage';
import RequiresWord from '../containers/RequiresWord';
import styles from '../../scss/App.scss';

@RequiresBackgroundImage
@RequiresWord
@pureRender
export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    backgroundImageUrl: PropTypes.string.isRequired,
    word: CustomPropTypes.word.isRequired
  };

  render() {
    return (
      <div className={styles.main}>
        <img className={styles.backgroundImage} src={this.props.backgroundImageUrl} />
        {this._renderContent()}
      </div>
    );
  }

  _renderContent = () => {
    const {word} = this.props;

    return (
      <div>
        <h1>{word.word}</h1>
        <section>
          {word.definitions.map((definition, i) => (
            <div key={i}>
              {definition}
            </div>
          ))}
        </section>
      </div>
    );
  };

}
