import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@elements/Button';
import WindowManager from '@helpers/WindowManager';

const SettingsButtonsContainer = styled.div`
padding: 15px;
text-align: right;
`;

const closeWindow = () => {
  WindowManager.close('settings');
};

class SettingsButtons extends Component {
  constructor(props) {
    super(props);

    this.onOK = this.onOK.bind(this);
  }

  onOK() {
    const { onSave } = this.props;

    onSave();
    closeWindow();
  }

  render() {
    const { onSave } = this.props;
    return (
      <SettingsButtonsContainer>
        <Button onClick={this.onOK}><FormattedMessage id="ok" defaultMessage="OK" /></Button>
        <Button onClick={onSave}><FormattedMessage id="apply" defaultMessage="Apply" /></Button>
        <Button onClick={closeWindow}><FormattedMessage id="cancel" defaultMessage="Cancel" /></Button>
      </SettingsButtonsContainer>
    );
  }
}

SettingsButtons.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SettingsButtons;
