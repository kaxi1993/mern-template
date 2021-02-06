import { combineReducers } from '@reduxjs/toolkit';

// import authReducers from './App/Auth/reducers'
import loginReducers from './App/pages/Auth/pages/Login/login.reducers';
// import signupReducers from './App/Auth/Signup/reducers'
// import forgotReducers from './App/Auth/Forgot/reducers'
// import resetReducers from './App/Auth/Reset/reducers'
// import navbarReducers from './App/Common/Navbar/reducers'
// import homeReducers from './App/Dashboard/Home/reducers'

export default combineReducers({
  // auth: authReducers,
  login: loginReducers,
  // signup: signupReducers,
  // forgot: forgotReducers,
  // reset: resetReducers,
  // navbar: navbarReducers,
  // home: homeReducers
});
