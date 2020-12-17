import React from 'react';
import { Card } from "antd";
import { connect } from 'react-redux';
import moment from 'moment';

class NextCall extends React.Component {
  state = {
    item: {
      name: '',
      phoneNumber: '',
      time: ''
    }
  }

  componentWillReceiveProps(props) {
    if (props.item !== null) {
      this.setState({ item: props.item })
    }
  }

  render() {
    return (

      <Card title="Next Call">
        <div className="card__container">
          <input disabled placeholder={this.state.item.name} />
          <input disabled placeholder={this.state.item.phoneNumber} />
          <input disabled placeholder={this.state.item.time ?
            moment(this.state.item.time).format("HH:mm:ss") :
            null} />
        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const arrayUncheckedRecords = state.records.filter((record) => {
    return record.isChecked !== true;
  });
  arrayUncheckedRecords.sort((a, b) => a.time > b.time ? 1 : -1);

  return { item: Object.assign({}, arrayUncheckedRecords[0]) }
}

export default connect(
  mapStateToProps)
  (NextCall)