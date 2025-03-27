import { createSlice } from '@reduxjs/toolkit';

const serverinfo = createSlice({
    name: 'regionInfo',
    initialState: {
        defaultRegion: {},
        regionInformation: {},
        defaultIp: '',
        serverItems: [],
        vpnItem: {},
        connectState: false,
        time: 0,
        isRunning: false,
        intervalId: null,
        defaultVpn: {},
    },
    reducers: {
        setDefaultRegion: (state, action) => {
          state.defaultRegion = action.payload;
        },
        setRegionInformation: (state, action) => {
            state.regionInformation = action;
        },
        setDefaultIp: (state, action) => {
            state.defaultIp = action;
        },
        setServerItems: (state, action) => {
            state.serverItems = action;
        },
        setVpnItem: (state, action) => {
            state.vpnItem = action.payload;
        },
        setConectState: (state, action) => {
            state.connectState = action.payload;
        },
        setDefailtVpn: (state, action) => {
          state.defaultVpn = action.payload;
        },
        setTimeConnect: (state, actiom) => {
          state.time = actiom.payload;
        },
    },
});

export const {
  setRegionInformation,
  setDefaultIp,
  setServerItems,
  setVpnItem,
  setConectState,
  setDefailtVpn,
  setDefaultRegion,
  setTimeConnect,
} = serverinfo.actions;

export default serverinfo.reducer;
