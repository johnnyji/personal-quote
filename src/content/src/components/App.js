import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import RequiresBackgroundImage from '../containers/RequiresBackgroundImage';
import styles from '../../scss/App.scss';

@pureRender
@RequiresBackgroundImage
export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    backgroundImageUrl: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={styles.main}>
        <h1>Hello My Nigga</h1>
      </div>
    );
  }

}
