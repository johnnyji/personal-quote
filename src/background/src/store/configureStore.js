import {applyMiddleware, createStore} from 'redux';
import {alias} from 'react-chrome-redux';
import actionAliases from '../action_aliases';
import logger from 'redux-logger';
import reducers from '../reducers';
import thunk from 'redux-thunk';

// TODO: Remove Logger for Prod
const middleware = applyMiddleware(
  // Aliases actions for react-chrome-redux,
  // See: https://github.com/tshaddix/react-chrome-redux/wiki/Advanced-Usage
  alias(actionAliases),
  thunk,
  logger()
);

export default (initialStateOverride = {}) => {
  // Returns the configured store,
  return createStore(
    reducers,
    initialStateOverride,
    middleware
  );
};
