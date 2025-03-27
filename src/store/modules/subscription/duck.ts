import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionState } from './type';


export const SubscriptionDefaultState: SubscriptionState = {
   subscriptionType: 'trial',
   subcriptionExpiredAt: '',
   isExpired: false,
   isPaid: false,
};

export const subscription = createSlice({
    name: 'Subscription',
    initialState: {
        subscriptionType: 'trial',
        subcriptionExpiredAt: '',
        isExpired: false,
        isPaid: false,
    },
    reducers: {
        updateSubscription(state, action: PayloadAction<SubscriptionState>){
            state.isExpired = action.payload.isExpired;
            state.isPaid = action.payload.isPaid;
            state.subcriptionExpiredAt = action.payload.subcriptionExpiredAt;
            state.subscriptionType = action.payload.subscriptionType;
        },
        setExpired(state, action: PayloadAction<boolean>){
            state.isExpired = action.payload;
        },
    },
});

export const subscriptionReducer = subscription.reducer;

export const { updateSubscription, setExpired } = subscription.actions;

