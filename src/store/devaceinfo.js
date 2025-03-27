// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const deviceInfo = createSlice({
    name: 'counter',
    initialState: { deviceId: '' },
    reducers: {
        setDeviceId: (state, action) => {
            state.deviceId = action.payload;
        },
    },
});

export const { setDeviceId } = deviceInfo.actions;

export default deviceInfo.reducer;
