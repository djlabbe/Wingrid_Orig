import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import sheets from './sheets';
import entry from './entry';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  alert,
  auth,
  profile,
  sheets,
  entry,
  form: reduxForm
});
