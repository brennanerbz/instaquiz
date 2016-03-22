import React from 'react';
import cookie from 'react-cookie';
import {IndexRoute, Route} from 'react-router';
import {
    About,
    App,
    Assignment,
    ErrorPage,
    Index,
    HomeworkContainer,
    NotFound,
    Quiz
} from 'containers';

import {
  Homework,
  HomeworkReading,
  HomeworkQuestions
} from 'components';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="about" component={About}>
      </Route>
  	  <Route path="assignment" component={Assignment}>
  	  	<Route path=":token" component={Assignment}>
          <Route path=":tab" component={Assignment}/>
        </Route>
  	  </Route>
      <Route path="homework" component={HomeworkContainer}>
        <Route path=":token" component={Homework}>
          <Route path="read" component={HomeworkReading}/>
          <Route path="questions" component={HomeworkQuestions}/>
        </Route>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
};

