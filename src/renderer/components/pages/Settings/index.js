import React, { Component } from 'react';
import Dropdown from '@elements/Dropdown';
import {
  themes,
  languages,
} from '@constants/lists';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {},
    };

    this.setTheme = this.setValue.bind(this, 'theme');
    this.setLanguage = this.setValue.bind(this, 'language');
  }

  setValue(prop, value) {
    const { config } = this.state;
    this.setState({
      config: {
        ...config,
        [prop]: value,
      },
    });
  }

  getValue(prop) {
    const config = this.getConfig();
    return config[prop];
  }

  getConfig() {
    const { config } = this.state;

    return { ...this.props, ...config };
  }

  render() {
    const config = this.getConfig();

    const {
      theme = 'dark',
      language = 'en',
    } = config;

    return (
      <div>
        <Dropdown
          value={theme}
          options={themes}
          onChange={this.setTheme}
        />
        <Dropdown
          value={language}
          options={languages}
          onChange={this.setLanguage}
        />
      </div>
    );
  }
}

export default Settings;
