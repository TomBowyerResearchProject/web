import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import DefaultFeedPage from './feed/FeedPage';
import DefaultMessengerPage from './messenger/MessengerPage';
import LogInPage from './logIn/LogInPage';
import RegisterPage from './register/RegisterPage';
import IndividualPostPage from './feed/IndividualPostPage';
import Autologin from './autologin/Autologin';
import DefaultNotificationPage from './notifications/NotificationPage';
import DefaultExplorePage from './explore/ExplorePage';
import LogOutPage from './logout/LogOutPage';
import NotFoundPage from './NotFound';
import ConnectedProfilePage from './profile/ProfilePage';

function App() {
  return (
    <>
      <div role="navigation">
        <a className="skip-to-content-link" href="#main">
          Skip to content
        </a>
      </div>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/messenger" component={DefaultMessengerPage} />
        <Route path="/feed" component={DefaultFeedPage} />
        <Route path="/notifications" component={DefaultNotificationPage} />
        <Route path="/profile" component={ConnectedProfilePage} />
        <Route path="/post/:id" component={IndividualPostPage} />
        <Route path="/autologin/" component={Autologin} />
        <Route path="/explore" component={DefaultExplorePage} />
        <Route path="/log_out" component={LogOutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
