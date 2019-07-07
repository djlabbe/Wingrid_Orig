import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Profile from '../profile/Profile';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile/CreateProfile';
import EditProfile from '../profile/EditProfile';
import SheetNew from '../sheet-forms/SheetNew';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Challenge from '../dashboard/Challenge';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/create-sheet' component={SheetNew} />
        <PrivateRoute exact path='/challenge' component={Challenge} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
