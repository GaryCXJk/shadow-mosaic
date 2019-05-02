import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';
import MenuTitle from './MenuTitle';

const Menu = () => (
  <MenuBar>
    <MenuTitle>Shadow Mosaic</MenuTitle>
    <MenuItem onClick={() => { remote.getCurrentWindow().close(); }}>&times;</MenuItem>
  </MenuBar>
);

export default Menu;
