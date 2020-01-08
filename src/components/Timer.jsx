import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Progress, Row, Col } from 'antd';
import formatDate from '../functions';
import sound from '../audio/ding.mp3';
import InputTime from './InputTime';
import SliderTime from './SliderTime';

const { Title } = Typography;

class Timer extends Component {
  state = {
    isRunning: false,
    isEnd: true,
    frameId: null,
    currentTime: 0,
    prevTime: 0,
    endTime: 0,
  };

  componentWillUnmount() {
    const { frameId } = this.state;
    cancelAnimationFrame(frameId);
    this.setState({ frameId: null });
  }

  onSliderChange = value => this.setState({ endTime: value * 1000 });

  isNumeric = val => !Number.isNaN(parseInt(val, 10)) && Number.isFinite(val);

  playSound = () => {
    const audioEffect = new Audio(sound);
    audioEffect.play();
  };

  onMinChange = value => {
    if (!this.isNumeric(value) || value >= 720) {
      return;
    }
    const { endTime } = this.state;
    const newEndTime = new Date(endTime).setUTCHours(0, 0) + value * 60 * 1000;
    this.setState({ endTime: newEndTime });
  };

  onSecChange = value => {
    if (!this.isNumeric(value) || value >= 60) {
      return;
    }
    const { endTime } = this.state;
    const newEndTime = new Date(endTime).setSeconds(0) + value * 1000;
    this.setState({ endTime: newEndTime });
  };

  handleStart = () => {
    const { endTime } = this.state;
    const { type } = this.props;
    if (!endTime && type === 'countdown') {
      return;
    }
    this.setState(
      {
        isRunning: true,
        isEnd: false,
        prevTime: Date.now(),
      },
      this.proccessTime
    );
  };

  handlePause = () => this.setState({ isRunning: false });

  handleReset = () =>
    this.setState({
      isRunning: false,
      isEnd: true,
      currentTime: 0,
      prevTime: 0,
      endTime: 0,
    });

  proccessTime = () => {
    const { isRunning, prevTime, currentTime, endTime } = this.state;
    const { type } = this.props;

    if (isRunning) {
      if (currentTime >= endTime && type === 'countdown') {
        this.playSound();
        this.handleReset();
        return;
      }
      this.setState({
        currentTime: currentTime + Date.now() - prevTime,
        prevTime: Date.now(),
        frameId: requestAnimationFrame(this.proccessTime),
      });
    }
  };

  render() {
    const { currentTime, isRunning, endTime } = this.state;
    const { type } = this.props;
    const progress = (currentTime / endTime) * 100;
    const startButton = (
      <Button type="primary" onClick={this.handleStart}>
        Start
      </Button>
    );
    const pauseButton = (
      <Button type="primary" onClick={this.handlePause}>
        Pause
      </Button>
    );
    const inputBlock = (
      <div className="inputBlock">
        <InputTime {...this.state} onSecChange={this.onSecChange} onMinChange={this.onMinChange} />
        <SliderTime {...this.state} onSliderChange={this.onSliderChange} />
      </div>
    );
    return (
      <div className="stopwatch">
        {type === 'countdown' && inputBlock}
        <Title>{formatDate(Math.abs(endTime - currentTime))}</Title>
        {isRunning ? pauseButton : startButton}
        <Button type="danger" onClick={this.handleReset}>
          Reset
        </Button>
        {endTime > 0 && (
          <Row type="flex" justify="center">
            <Col span={6}>
              <Progress percent={Math.floor(progress)} status="active" />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

Timer.propTypes = {
  type: PropTypes.string,
};

Timer.defaultProps = {
  type: 'stopwatch',
};

export default Timer;
