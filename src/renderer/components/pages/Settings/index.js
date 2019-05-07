import React, { Component } from 'react';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {},
    };
  }

  render() {
    const { config } = this.state;

    const {
      theme = 'dark',
    } = { ...this.props, ...config };

    return (
      <div>{theme}</div>
    );
  }
}

export default Settings;
