import React from 'react';
import cookie from 'react-cookie';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Assignment,
    Index,
    NotFound,
    Quiz
} from 'containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
  	  <Route path="assignment" component={Assignment}>
  	  	<Route path=":id" component={Assignment}/>
  	  </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
};

