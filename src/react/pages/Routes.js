import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About';
import Dashboard from './Dashboard';

const Routes = () => (
  <Switch>
    <Route path="/about" component={About} />
    <Route component={Dashboard} />
  </Switch>
);

export default Routes;
