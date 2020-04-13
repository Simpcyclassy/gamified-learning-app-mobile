import {combineReducers} from 'redux';

import router from './router';

export default combineReducers({
  router: router.reducers,
});
