export const createRecord = (recordObject) => {
  return {
    type: 'CREATE_RECORD',
    payload: recordObject
  };
}

export const removeRecord = (recordId) => {
  return {
    type: 'REMOVE_RECORD',
    payload: recordId
  }
}

export const changeRecordCheck = (time) => {
  return {
    type: 'CHANGE_RECORD_CHECK',
    payload: time
  }
}