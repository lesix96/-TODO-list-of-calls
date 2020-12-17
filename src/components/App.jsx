import React from 'react';
import RecordCreate from './RecordCreate';
import ListOfRecords from './ListOfRecords';

const App = (props) => {
  return (
    <div>
      <RecordCreate store={props.store} />
      <ListOfRecords store={props.store} />
    </div>
  )
}

export default App;