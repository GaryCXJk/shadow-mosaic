import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from '@containers/pages/Settings';
import About from './About';
import Dashboard from './Dashboard';

const Routes = () => (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/settings" component={Settings} />
    <Route component={Dashboard} />
  </Switch>
);

export default Routes;
