import React, {Component} from 'react';
import styles from '../../../scss/ui/FullPageSpinner.scss';
import pureRender from 'pure-render-decorator';

@pureRender
export default class FullPageSpinner extends Component {

  static displayName = 'FullPageSpinner';
  
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.spinner}>Loading...</div>
      </div>
    );
  }

}

