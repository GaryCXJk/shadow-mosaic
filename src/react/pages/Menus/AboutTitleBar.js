import React from 'react';
import Menu from '../../components/Menu';

const AboutTitleBar = () => (
  <Menu
    title="About Shadow Mosaic"
    titleId="help.about"
    window="about"
    canMinimalize={false}
  />
);

export default AboutTitleBar;
