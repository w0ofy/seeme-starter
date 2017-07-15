import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

// Import static pages
import HomePage from './components/pages/home-page';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
// import ForgotPassword from './components/auth/forgot_password';
// import ResetPassword from './components/auth/reset_password';

// Import dashboard pages
import Profile from './components/dashboard/profile.js';
import EditInfo from './components/dashboard/profile/edit-info';
import Swipe from './components/dashboard/profile/swipe/swipe.js';
import YourInfo from './components/dashboard/profile/your-profile';
// import Inbox from './components/dashboard/messaging/inbox';
// import Conversation from './components/dashboard/messaging/conversation';
// import ComposeMessage from './components/dashboard/messaging/compose-message';

// Import higher order components
import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="my-profile" component={Profile} />
    <Route path="edit-info" component={Profile} />
    <Route path="see/:uid" component={YourInfo} />
    <Route path="swatch" component={Swipe} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
