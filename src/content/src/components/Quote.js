import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import pureRender from 'pure-render-decorator';
import styles from '../../scss/Quote.scss';

@pureRender
export default class Quote extends Component {

  static displayName = 'Quote';

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired
  };
  
  render() {
    const {className, text} = this.props;

    return (
      <div className={classNames(className, styles.main)}>
        <p className={styles.quote}>{text}</p>
      </div>
    );
  }

}

