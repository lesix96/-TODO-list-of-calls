import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import handleRecords from './handleRecords';

export default combineReducers({
  records: handleRecords,
  form: formReducer
});