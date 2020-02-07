import React, { memo } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Elections from '../components/container/Elections';
import User from './container/User';

const Router = () => {
  const routeRenderer = routeProps => <User {...routeProps} />;

  return (
    <Switch>
      <Redirect exact={true} from="/" to="/elections" />
      <Route path="/elections">
        <Elections />
      </Route>
      <Route path="/user/:userID" render={routeRenderer}></Route>
    </Switch>
  );
};

export default memo(Router);
