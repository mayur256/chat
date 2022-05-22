import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// utilities
import { storageToState } from '../../utilities/Common';
import { IAuthUser } from '../../components/types';

const authUser: IAuthUser | null = storageToState();

const initialState: IAuthUser = {
    _id: '',
    name: '',
    email: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState: authUser ?? initialState,
    reducers: {
        SET_CURRENT_USER: (state = initialState, action: PayloadAction<IAuthUser>) => {
            state = action.payload;
        }
    }
});

// actions
export const { SET_CURRENT_USER } = userSlice.actions;
// reducer
export default userSlice.reducer;
