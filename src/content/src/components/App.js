import React, {Component, PropTypes} from 'react';
import AuthActionCreators from '../../../background/src/action_creators/AuthActionCreators';
import pureRender from 'pure-render-decorator';
import Quote from './Quote';
import RequiresBackgroundImage from '../containers/RequiresBackgroundImage';
import RequiresMediumAuth from '../containers/RequiresMediumAuth';
import styles from '../../scss/App.scss';

@pureRender
@RequiresBackgroundImage
@RequiresMediumAuth
export default class App extends Component {

  static displayName = 'App';

  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    fetchedUser: PropTypes.bool.isRequired,
    fetchingUser: PropTypes.bool.isRequired,
    backgroundImageUrl: PropTypes.string.isRequired
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
    const {currentUser, fetchingUser} = this.props;

    if (!currentUser) {
      return (
        <button
          disabled={fetchingUser}
          onClick={this._handleAuthMedium}>
          {fetchingUser ? 'Loading...' : 'Login With Medium'}
        </button>
     );
    }

    return <Quote className={styles.mainText} />;
  };

  _handleAuthMedium = () => {
    this.props.dispatch(AuthActionCreators.authMedium());
  };

}
