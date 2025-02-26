import { configureStore } from '@reduxjs/toolkit';
import deviceInfo from './devaceinfo';
import serverinfo from './serverinfo'
import userInfo from './user'

export const store = configureStore({
    reducer: {
        counter: deviceInfo,
        regionInfo: serverinfo,
        user: userInfo
    },
});