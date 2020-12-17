import moment from 'moment';

export default (state = [], action) => {
  switch (action.type) {
    case 'CREATE_RECORD':
      return [...state, action.payload];
    case 'REMOVE_RECORD':
      return state.filter(element => element.id !== action.payload);
    case 'CHANGE_RECORD_CHECK':
      const newState = state.map((record) => {
        if (moment(record.time).format("HH:mm:ss") < action.payload) {
          record.isChecked = true;
        }
        return record;
      });
      return newState;

    default:
      return state;
  }
}