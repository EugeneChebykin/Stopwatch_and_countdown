import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider } from 'antd';

const SliderTime = props => {
  const { isRunning, onSliderChange, seconds, minutes, hours } = props;
  const formatTooltip = () => {
    const tooltipHours = `0${hours}`.slice(-2);
    const tooltipMinutes = `0${minutes}`.slice(-2);
    const tooltipSeconds = `0${seconds}`.slice(-2);
    return `${tooltipHours}:${tooltipMinutes}:${tooltipSeconds}`;
  };
  const value = new Date(hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000) / 1000;
  return (
    <Row type="flex" justify="center">
      <Col span={6}>
        <Slider
          step={15}
          max={3600}
          disabled={isRunning}
          value={value}
          onChange={onSliderChange}
          tipFormatter={formatTooltip}
        />
      </Col>
    </Row>
  );
};

SliderTime.propTypes = {
  onSliderChange: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
};

export default SliderTime;
