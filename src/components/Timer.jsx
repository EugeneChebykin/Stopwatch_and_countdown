import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Progress, Row, Col } from 'antd';
import sound from '../audio/ding.mp3';
import InputTime from './InputTime';
import SliderTime from './sliderTime';

const { Title } = Typography;

class Timer extends Component {
  state = {
    isRunning: false,
    currentTime: 0,
    prevTime: 0,
    endTime: 0,
    minutes: 0,
    seconds: 0,
    hours: 0,
    audioEffect: new Audio(sound),
  };

  getMsFromFormattedTime() {
    const { hours, minutes, seconds } = this.state;
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  }

  onSliderChange = value =>
    this.setState({
      minutes: new Date(value * 1000).getUTCMinutes(),
      seconds: new Date(value * 1000).getUTCSeconds(),
      hours: new Date(value * 1000).getUTCHours(),
    });

  onMinChange = value =>
    this.setState({
      minutes: new Date(value * 1000 * 60).getUTCMinutes(),
      hours: new Date(value * 1000 * 60).getUTCHours(),
    });

  onSecChange = value =>
    this.setState({
      seconds: value,
    });

  handleStart = () => {
    const { endTime } = this.state;
    const { type } = this.props;
    if (!this.getMsFromFormattedTime() && type === 'countdown') return;
    const newEndTime = this.getMsFromFormattedTime();
    this.setState(
      {
        isRunning: true,
        prevTime: Date.now(),
        endTime: endTime || newEndTime,
      },
      this.proccessTime
    );
  };

  handleEnd = () => {
    const { audioEffect } = this.state;
    audioEffect.play();
    this.setState({
      isRunning: false,
      currentTime: 0,
      prevTime: 0,
      endTime: 0,
    });
  };

  handlePause = () => this.setState({ isRunning: false });

  handleReset = () =>
    this.setState({
      isRunning: false,
      currentTime: 0,
      prevTime: 0,
      endTime: 0,
    });

  formatDate = date => {
    const milliSec = `00${new Date(date).getMilliseconds()}`.slice(-3);
    const sec = `0${new Date(date).getSeconds()}`.slice(-2);
    const min = `0${new Date(date).getMinutes()}`.slice(-2);
    const hour = `0${new Date(date).getUTCHours()}`.slice(-2);
    return `${hour}:${min}:${sec}:${milliSec}`;
  };

  proccessTime = () => {
    const { isRunning, prevTime, currentTime, endTime } = this.state;
    const { type } = this.props;
    if (currentTime >= endTime && type === 'countdown') {
      this.handleEnd();
      return;
    }
    if (isRunning) {
      this.setState({
        currentTime: currentTime + Date.now() - prevTime,
        prevTime: Date.now(),
      });
      requestAnimationFrame(this.proccessTime);
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
        <Title>{this.formatDate(Math.abs(endTime - currentTime))}</Title>
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
