import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, InputNumber } from 'antd';

const InputTime = props => {
  const { isRunning, onMinChange, onSecChange, minutes, seconds, hours } = props;
  const time = new Date(hours * 60 * 60 * 1000 + minutes * 60 * 1000) / 1000 / 60;
  return (
    <Row type="flex" justify="center" align="middle">
      <Col>
        <InputNumber
          onChange={onMinChange}
          formatter={val => `0${val}`.slice(-2)}
          value={time}
          disabled={isRunning}
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
          value={seconds}
          disabled={isRunning}
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
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default InputTime;
