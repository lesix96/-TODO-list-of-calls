import React from 'react';
import { connect } from 'react-redux';
import { removeRecord } from '../actions';
import RecordsTable from './RecordsTable';
import ButtonsDashBoard from './ButtonsDashboard';

class ListOfRecords extends React.Component {
  state = {
    isCheckFilter: false
  }

  removeRecord = (id) => {
    this.props.removeRecord(id);
  }

  filterByCheck = (flag) => {
    this.setState({ isCheckFilter: flag })
  }

  reduxLocalStorage = () => {
    this.props.store.subscribe(() => {
      localStorage['redux-store'] = JSON.stringify(this.props.store.getState())
    })
  }

  render() {
    return (
      <div>
        <ButtonsDashBoard checkFilter={this.filterByCheck} />
        <RecordsTable store={this.props.store} isCheckFilter={this.state.isCheckFilter} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { records: state.records }
}

export default connect(
  mapStateToProps,
  { removeRecord: removeRecord })
  (ListOfRecords);