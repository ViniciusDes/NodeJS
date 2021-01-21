import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainHealthPLan from './pages/HealthPlan';
import Main from './pages/Main';
import FormValidation from './pages/FormValidation';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/Health" component={MainHealthPLan} />
    <Route exact path="/FormValidation" component={FormValidation} />
  </Switch>
);

export default Routes;
