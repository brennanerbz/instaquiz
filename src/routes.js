import React from 'react';
import cookie from 'react-cookie';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Landing,
    NotFound,
    Quiz
} from 'containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Landing}/>
  	  <Route path="quiz" component={Quiz}>
  	  	<Route path=":quiz_title" component={Quiz}/>
  	  </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
};

