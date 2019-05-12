import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from '@elements/Block';
import Dropdown from '@elements/Dropdown';
import Label from '@elements/Label';
import FlexContainer from '@components/layout/FlexContainer';
import {
  themes,
  languages,
} from '@constants/lists';
import SettingsButtons from './SettingsButtons';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {},
    };

    this.onSave = this.onSave.bind(this);
    this.setTheme = this.setValue.bind(this, 'theme');
    this.setLanguage = this.setValue.bind(this, 'language');
  }

  onSave() {
    const { onSave } = this.props;
    const config = this.getConfig();

    onSave(config);
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
    const { config: propsConfig } = this.props;
    const { config: stateConfig } = this.state;

    return { ...propsConfig, ...stateConfig };
  }

  render() {
    const config = this.getConfig();

    const {
      theme = 'dark',
      language = 'en',
    } = config;

    return (
      <FlexContainer width="100%" height="100%" direction="column">
        <Block style={{ padding: '15px', flex: '1 0 0' }}>
          <Label fontSize="12px" id="settings.theme" defaultMessage="Theme" />
          <Dropdown
            value={theme}
            options={themes}
            onChange={this.setTheme}
          />
          <Label fontSize="12px" id="settings.language" defaultMessage="Language" />
          <Dropdown
            value={language}
            options={languages}
            onChange={this.setLanguage}
          />
        </Block>
        <SettingsButtons onSave={this.onSave} />
      </FlexContainer>
    );
  }
}

Settings.propTypes = {
  config: PropTypes.shape().isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Settings;
