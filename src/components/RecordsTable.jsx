import React from 'react';
import { Table, Checkbox } from 'antd';
import { Resizable } from 'react-resizable';
import { connect } from 'react-redux';
import { removeRecord, changeRecordCheck } from '../actions';
import moment from 'moment';

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class RecordsTable extends React.Component {
  format = "HH:mm:ss";

  timeSort = (timeA, timeB) => {
    return moment(timeA).format(this.format).localeCompare(moment(timeB).format(this.format));
  };

  timeToStringFormat = (time) => {
    return moment(time).format(this.format)
  }

  removeSomeRecord = (record) => {
    this.props.removeRecord(record.id);
  }

  state = {
    checkFilter: false,
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key:'name',
        width: 200,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        key:'phoneNumber',
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        width: 200,
      },
      {
        key:'time',
        title: 'Time',
        dataIndex: 'time',
        width: 200,
        sorter: (a, b) => this.timeSort(a.time, b.time),
        render: (text, record, index) => { return this.timeToStringFormat(record.time) }
      },
      {
        key:'checked',
        title: 'Checked',
        dataIndex: 'isChecked',
        width: 200,
        render: (text, record, index) => { return <Checkbox disabled checked={record.isChecked} /> },
      },
      {
        key:'delete',
        title: 'Action',
        key: 'action',
        width: 200,
        render: (text, record, index) => { return <a onClick={() => this.removeSomeRecord(record)}>Delete</a> },
      },
    ],
  };

  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  checkRecordRecordingTime = () => {
    setInterval(() => {
      let cuttentTime = this.timeToStringFormat(new Date())
      this.props.changeRecordCheck(cuttentTime);
    }, 1000);
  }

  componentDidMount() {
    (() => {
      this.props.store.subscribe(() => {
        localStorage['redux-store'] = JSON.stringify(this.props.store.getState())
      })
    })();
    
    this.checkRecordRecordingTime();
  }

  componentWillReceiveProps(props) {
    this.setState({ checkFilter: props.isCheckFilter })
  }

  filterByCheck(flag) {
    if (!flag) {
      return this.props.records;
    }
    else {
      return this.props.records.filter((record) => {
        return record.isChecked === true;
      });
    }
  }

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return (
      <div className="table__container">
        <Table
          rowKey="name"
          bordered
          components={this.components}
          columns={columns}
          dataSource={this.filterByCheck(this.state.checkFilter)}
          pagination={false} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { records: state.records }
}

export default connect(
  mapStateToProps,
  {
    removeRecord: removeRecord,
    changeRecordCheck: changeRecordCheck
  })
  (RecordsTable)