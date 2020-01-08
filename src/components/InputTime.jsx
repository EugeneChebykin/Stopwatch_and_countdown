import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber } from 'antd';

const InputTime = props => {
  const { onMinChange, onSecChange, endTime, isEnd } = props;
  const minutes = Math.floor(endTime / 1000 / 60);
  const seconds = new Date(endTime).getUTCSeconds();
  return (
    <Row type="flex" justify="center" align="middle">
      <Col>
        <InputNumber
          onChange={onMinChange}
          formatter={val => (val >= 100 ? val : `0${val}`.slice(-2))}
          parser={val => Number(val)}
          value={minutes}
          disabled={!isEnd}
          size="large"
          min={0}
          max={719}
        />
      </Col>
      <Col style={{ fontSize: 40 }}>:</Col>
      <Col>
        <InputNumber
          onChange={onSecChange}
          formatter={val => `0${val}`.slice(-2)}
          parser={val => Number(val)}
          value={seconds}
          disabled={!isEnd}
          size="large"
          min={0}
          max={59}
        />
      </Col>
    </Row>
  );
};

InputTime.propTypes = {
  onMinChange: PropTypes.func.isRequired,
  onSecChange: PropTypes.func.isRequired,
  isEnd: PropTypes.bool.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default InputTime;
