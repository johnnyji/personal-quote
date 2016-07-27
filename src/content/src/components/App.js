import React, {Component, PropTypes} from 'react';
import AuthActionCreators from '../../../background/src/action_creators/AuthActionCreators';
import CustomPropTypes from '../utils/CustomPropTypes';
import pureRender from 'pure-render-decorator';
import Quote from './Quote';
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
    debugger;
    return (
      <div className={styles.main}>
        <img className={styles.backgroundImage} src={this.props.backgroundImageUrl} />
        {this._renderContent()}
      </div>
    );
  }

  _renderContent = () => {
    return <Quote className={styles.mainText} text={this.props.word} />;
  };

}
