import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

const store = configureStore(rootReducer);

export default store;
