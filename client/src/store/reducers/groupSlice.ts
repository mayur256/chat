// top level imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utils
import { GroupType } from "../../components/types";

const initialState: GroupType[] = [];

// Slice definition
const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        ADD_GROUP: (state = [], action: PayloadAction<GroupType>) => {
            state.push(action.payload)
        },

        SET_GROUPS: (state = [], action: PayloadAction<GroupType[]>) => {
            return [...state, ...action.payload];
        }
    }
});

// actions
export const { ADD_GROUP, SET_GROUPS } = groupSlice.actions;

// reducers
export default groupSlice.reducer;
