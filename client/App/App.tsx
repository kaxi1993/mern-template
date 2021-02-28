import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import AppRouter from './Router'

const App: React.FC = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
