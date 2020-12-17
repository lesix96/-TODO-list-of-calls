import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import NextCall from './NextCall';

const ButtonsDashBoard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="button__dashboard">
      <Button className="button" type="primary" size={'large'} onClick={() => props.checkFilter(false)}>
        All
      </Button>
      <Button className="button" type="primary" size={'large'} onClick={showModal}>
        Next
      </Button>
      <Modal visible={isModalVisible}
        onCancel={handleCancel} width={700}
        onOk={handleCancel}>
        <NextCall />

      </Modal>
      <Button className="button" type="primary" size={'large'} onClick={() => props.checkFilter(true)}>
        Finished
      </Button>
    </div>
  )
}

export default ButtonsDashBoard;