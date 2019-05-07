import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Button from '@elements/Button';
import WindowManager from 'common/helpers/WindowManager';

const AboutButtonsContainer = styled.div`
padding: 15px;
text-align: center;
`;

const closeWindow = () => {
  WindowManager.get('about').close();
};

const AboutButtons = () => (
  <AboutButtonsContainer>
    <Button onClick={closeWindow}><FormattedMessage id="ok" defaultMessage="OK" /></Button>
  </AboutButtonsContainer>
);

export default AboutButtons;