import { createSlice } from '@reduxjs/toolkit';

const userInfo = createSlice({
    name: 'user',
    initialState: { 
        userid: '' ,
        onBording: false,
        isFree: true
    },
    reducers: {
        setUserId: (state, action) => {
            state.userid = action.payload;
        },
        setOnbording: (state, action) => {
            state.onBording = action.payload
        },
        setIsFree: (state, action) => {
            state.isFree = action.payload
        }
    },
});

export const { setUserId, setOnbording,  setIsFree} = userInfo.actions;

export default userInfo.reducer;