import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from './theme/Colors.ts';
import RNBootSplash from 'react-native-bootsplash';
import Navigator from './navigation/Navigator.tsx';
import DeviceInfo from 'react-native-device-info';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store.js';
import { setDeviceId } from './store/devaceinfo.js';
import { setDefaultIp, setRegionInformation, setServerItems, setDefailtVpn, setDefaultRegion } from './store/serverinfo.js';
import axios from "axios";
import { setOnbording, setUserId } from './store/user.js';

function MainApp(): React.JSX.Element {
    const dispatch = useDispatch();
    const API_URL = "http://10.0.2.2:8080";
    const [loading, setLoading] = useState(true);

    async function getCoordinates(ip: string) {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        if (data.status === "success") {
            dispatch(setRegionInformation(data));
            dispatch(setDefaultRegion(data));
            console.log(`Latitude: ${data.lat}, Longitude: ${data.lon}`);
        } else {
            console.error("Unable to fetch coordinates.");
        }
    }

    const fetchServers = async () => {
        try {
            const response = await axios.get(`${API_URL}/servers-list`);
            dispatch(setServerItems(response.data));
        } catch (error) {
            console.error("Ошибка при получении серверов:", error);
        }
    };

    const fetchDefault = async () => {
        try {
            const response = await axios.get(`${API_URL}/default-vpn`);
            dispatch(setDefailtVpn(response.data));
        } catch (error) {
            console.error("Ошибка при получении дефолтного сервера:", error);
        }
    };

    const fetchUser = async (deviceID: string) => {
        try {
            const response = await axios.post(`${API_URL}/check-user`, { deviceid: deviceID });
            dispatch(setOnbording(response.data.exists));
            console.log("Ответ от сервера:", response.data);
        } catch (error) {
            console.error("Ошибка при проверке пользователя:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchServers(),
                    fetchDefault(),
                    fetch('https://api.ipify.org?format=json')
                        .then(response => response.json())
                        .then(data => {
                            const ip = data.ip;
                            dispatch(setDefaultIp(ip));
                            return getCoordinates(ip);
                        }),
                    DeviceInfo.getUniqueId().then(uniqueID => {
                        dispatch(setDeviceId(uniqueID));
                        dispatch(setUserId(uniqueID));
                        return fetchUser(uniqueID);
                    })
                ]);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setLoading(false);
                RNBootSplash.hide({ fade: true });
            }
        };

        loadData();
    }, [dispatch]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <StatusBar backgroundColor={Colors.mainBackground} />
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                        <ActivityIndicator size="large" color="#E7FE55" />
                    </View>
                ) : (
                    <Navigator />
                )}
            </PaperProvider>
        </GestureHandlerRootView>
    );
}

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <MainApp />
        </Provider>
    );
}

export default App;
