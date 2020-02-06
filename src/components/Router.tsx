import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Elections from '../components/container/Elections';
import User from './container/User';

const Router = () => (
  <Switch>
  <Route path="/">
    <Elections />
  </Route>
  <Route path="/user/:userid">
    <User />
  </Route>
</Switch>
);

export default Router;
