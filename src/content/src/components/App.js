import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import styles from '../../scss/App.scss';

const CLS = 'App';

@pureRender
export default class App extends Component {

  static displayName = CLS;

  render() {
    return (
      <div className={styles.main}>
        <h1>Hello My Nigga</h1>
      </div>
    );
  }

}
