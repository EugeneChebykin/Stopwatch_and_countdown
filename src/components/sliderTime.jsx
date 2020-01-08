import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Slider } from 'antd';
import formatDate from '../functions';

const SliderTime = props => {
  const { onSliderChange, endTime, isEnd } = props;
  const seconds = Math.floor(endTime / 1000);

  return (
    <Row type="flex" justify="center">
      <Col span={6}>
        <Slider
          step={15}
          max={3600}
          disabled={!isEnd}
          value={seconds}
          onChange={onSliderChange}
          tipFormatter={() => formatDate(endTime).slice(0, -4)}
        />
      </Col>
    </Row>
  );
};

SliderTime.propTypes = {
  onSliderChange: PropTypes.func.isRequired,
  isEnd: PropTypes.bool.isRequired,
  endTime: PropTypes.number.isRequired,
};

export default SliderTime;
