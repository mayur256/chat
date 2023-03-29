// Constituent reducers
import userReducer from './userSlice';
import groupReducer from './groupSlice';

export const rootReducer = {
    user: userReducer,
    groups: groupReducer
}