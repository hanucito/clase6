import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      out: true,
      pressed: false
    }
  }
  onClick = () => {
    this.props.onClick()
  }
  componentWillMount() {
    if (this.props.interval) this.handler = setInterval(() => {
      (this.state.pressed && !this.state.out) && this.onClick()
    }, this.props.interval)
  }
  componentWillUnmount() {
    clearInterval(this.handler)
  }
  onMouseDown = () => {
    this.setState({
      pressed: true
    })
  }
  onMouseUp = () => {
    this.setState({
      pressed: false
    })
  }
  onMouseLeave = () => {
    this.setState({
      out: true
    })
  }
  onMouseEnter = () => {
    this.setState({
      out: false
    })
  }
  render() {
    return (
      <button
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.props.children}
      </button>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  plusOne = () => {
    this.setState(({value}) => ({
      value: value + 1
    }))
  }
  minusOne = () => {
    this.setState(({value}) => ({
      value: value - 1
    }))
  }
  render() {
    const {value} = this.state;

    return (
      <div className="App">
        <h1>Counter App</h1>
        <div>
          <Button onClick={this.plusOne} interval={100}>+</Button>
          <button>{value}</button>
          <Button onClick={this.minusOne} interval={100}>-</Button>
        </div>
      </div>
    );
  }
}

export default App;
