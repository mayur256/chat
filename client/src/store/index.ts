// redux packages
import { configureStore } from '@reduxjs/toolkit';

// reducer
import { rootReducer } from './reducers';

export const store = configureStore({
    reducer: rootReducer,
});