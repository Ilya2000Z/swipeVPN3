import { configureStore } from '@reduxjs/toolkit';
import deviceInfo from './devaceinfo';
import serverinfo from './serverinfo';
import userInfo from './user';
import { subscriptionReducer } from './modules/subscription';

export const store = configureStore({
    reducer: {
        counter: deviceInfo,
        regionInfo: serverinfo,
        user: userInfo,
        subscription: subscriptionReducer,
    },
});
