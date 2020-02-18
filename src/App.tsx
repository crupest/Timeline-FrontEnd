import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import AppBar from './common/AppBar';
import LoadingPage from './common/LoadingPage';
import Home from './home/Home';
import Login from './user/Login';
import Settings from './settings/Settings';
import User from './user/User';
/*
import TimelinePage from './timelinePage/TimelinePage';
*/

import { useUser } from './data/user';

const NoMatch: React.FC = () => {
  return (
    <>
      <AppBar />
      <div style={{ height: 56 }} />
      <div>Ah-oh, 404!</div>
    </>
  );
};

const LazyAdmin = React.lazy(() =>
  import(/* webpackChunkName: "admin" */ './admin/Admin')
);

const App: React.FC = _ => {
  const user = useUser();

  let body;
  if (user === undefined) {
    body = <LoadingPage />;
  } else {
    /*
    body = (
      <React.Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/timelines/:name">
            <TimelinePage />
          </Route>
          <Route path="/users/:username">
            <User />
          </Route>
          {user && user.administrator && (
            <Route path="/admin">
              <LazyAdmin user={user} />
            </Route>
          )}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </React.Suspense>
    );
    */

    body = (
      <React.Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/users/:username">
            <User />
          </Route>
          {user && user.administrator && (
            <Route path="/admin">
              <LazyAdmin user={user} />
            </Route>
          )}
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </React.Suspense>
    );
  }

  return <Router>{body}</Router>;
};

export default hot(App);
