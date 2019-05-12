import React from 'react';
import { Switch, Route } from 'react-router-dom';
import watchSettings from '@hoc/watchSettings';
import GeneralMenu from './GeneralMenu';
import AboutTitleBar from './AboutTitleBar';
import SettingsTitleBar from './SettingsTitleBar';

const Menus = () => (
  <Switch>
    <Route path="/settings" component={SettingsTitleBar} />
    <Route path="/about" component={AboutTitleBar} />
    <Route component={GeneralMenu} />
  </Switch>
);

export default watchSettings(Menus);
