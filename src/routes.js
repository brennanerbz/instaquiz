import React from 'react';
import cookie from 'react-cookie';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, loadAuthCookie } from 'redux/modules/auth';
import {
    App,
    Landing,
    NotFound
  } from 'containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
};

