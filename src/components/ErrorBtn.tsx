import React, { Component } from 'react';

class ErrorBtn extends Component {
  state = {
    error: false,
  };

  generateError = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    if (this.state.error) {
      throw new Error('Synthetic error');
    }
    return (
      <button className="btn btn_error" onClick={this.generateError}>
        {'Generate error'}
      </button>
    );
  }
}

export default ErrorBtn;
