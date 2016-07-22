import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';

const CLS = 'App';

@pureRender
export default class App extends Component {

  static displayName = CLS;

  render() {
    return (
      <div className={CLS}>
        Hello World!
      </div>
    );
  }

}
