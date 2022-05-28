import { combineReducers } from 'redux';

import auth from './auth/reducer';
import example from './example/reducer';

export default combineReducers({
  auth,
  example,
});
