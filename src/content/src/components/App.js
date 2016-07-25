import React, {Component, PropTypes} from 'react';
import AuthActionCreators from '../../../background/src/action_creators/AuthActionCreators';
import pureRender from 'pure-render-decorator';
import Quote from './Quote';
import RequiresBackgroundImage from '../containers/RequiresBackgroundImage';
import RequiresFacebookAuth from '../containers/RequiresFacebookAuth';
import styles from '../../scss/App.scss';

@pureRender
@RequiresBackgroundImage
@RequiresFacebookAuth
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
          onClick={this._handleAuthFacebook}>
          {fetchingUser ? 'Loading...' : 'Login With Facebook'}
        </button>
     );
    }

    return <Quote className={styles.mainText} text={currentUser.name} />;
  };

  _handleAuthFacebook = () => {
    this.props.dispatch(AuthActionCreators.authFacebook());
  };

}
