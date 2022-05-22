import { store } from './index';

// infer type of rootstate from the store
export type RootState = ReturnType<typeof store.getState>

// infer type for dispatch used in this application based on store's dispatch
export type AppDispatch = typeof store.dispatch