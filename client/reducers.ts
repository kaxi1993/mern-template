import { combineReducers } from '@reduxjs/toolkit';

// import authReducers from './App/Auth/reducers'
// import loginReducers from './App/pages/Auth/pages/Login/login.reducers';
// import signupReducers from './App/Auth/Signup/reducers'
// import forgotReducers from './App/Auth/Forgot/reducers'
// import resetReducers from './App/Auth/Reset/reducers'
// import navbarReducers from './App/Common/Navbar/reducers'
// import homeReducers from './App/Dashboard/Home/reducers'

const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
