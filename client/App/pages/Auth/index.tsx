import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';

import './Auth.scss';

function Auth({ isAuthenticated }) {
  return (
    <div className="mt-container">
      <Route path="/(login|signup|forgot|reset)" render={() => isAuthenticated && <Redirect to="/app" />} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/reset" component={Reset} />
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth;

  return {
    isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps)(Auth));
