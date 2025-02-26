import {View, Alert, TouchableOpacity, Image, Text} from 'react-native';
import { Platform, StyleSheet, ActivityIndicator } from 'react-native';
// import { useFonts } from "expo-font";
import BaseButton from '../UI/BaseButton.js'
import Place from '../UI/Place.js'
import MapDot from '../UI/MapDot.js'
import SwipeSlider from "../../components/SwipeButton.tsx";
import React, {useRef, useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import Dot from '../../assets/svg/dot.js';
import RNFS from 'react-native-fs';
import { useSelector, useDispatch } from 'react-redux';
import RNSimpleOpenvpn, { addVpnStateListener, removeVpnStateListener } from 'react-native-simple-openvpn';
import { setConectState } from '../../store/serverinfo.js';
import { Animated } from 'react-native';
import { Easing } from 'react-native';
import GradientOverlay from '../../assets/svg/GradientOverlay.js';
import ConnectionScreen from '../ConnectionScreen.js';
import { setRegionInformation } from '../../store/serverinfo.js';
import { Colors } from '../../theme/Colors.ts';
import Images from '../../assets/Images.ts';
import {DrawerActions, useNavigation} from '@react-navigation/native';



const MapScreen = ({ navigation }) => {

    const regionInfo = useSelector(state => state.regionInfo);
    const user = useSelector(state => state.user);
    const [opacity] = useState(new Animated.Value(0));  // Значение прозрачности для анимации
    const vpnSelectedItem = useSelector(state => state.regionInfo.vpnItem)
    const dispatch = useDispatch();
    // const [fontsLoaded] = useFonts({
    //     "Montserrat-600": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    // });
    // const state = store.getState();

    const startRegion = regionInfo.regionInformation.payload
    const mapViewRef = useRef(null); // Ссылка на MapView
    const [markerPosition, setMarkerPosition] = useState({
        latitude: startRegion.lat,
        longitude: startRegion.lon,
    });
    const [selectCountry, setSelectCountry] = useState(false)
    const [stateConnect, setStateConnect] = useState(false);
    const [clientName, setClientName] = useState('');
    const [serverIp, setServerIp] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const isIPhone = Platform.OS === 'ios';
    const [vpnState, setVpnState] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const readOvpnFile = async (filePath: any) => {
    try {
        // Проверяем, существует ли файл
        const fileExists = await RNFS.exists(filePath);
        if (!fileExists) {
            throw new Error('Файл не найден');
        }

        // Читаем содержимое файла
        const ovpnConfig = await RNFS.readFile(filePath, 'utf8');

        return ovpnConfig;
    } catch (error) {
        console.error('Ошибка при чтении OVPN-файла:', error);
        return null;
    }
};
    useEffect(()=> {
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,  // Убираем затемнение
                duration: 400,  // Длительность 0.4s
                easing: Easing.ease,  
                useNativeDriver: true,
            }).start();
        }, 2500)
    }, [isMapLoaded])
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,  // 80% затемнения
            duration: 0,  // Длительность 0.4s
            easing: Easing.ease,  // Плавное ускорение и замедление
            useNativeDriver: true,
        }).start();
    }, [])
    useEffect(() => {
        setServerIp(regionInfo?.vpnItem?.ip)
        const observeVpn = async () => {
                  if (Platform.OS === 'ios') {
                    await RNSimpleOpenvpn.observeState();
                  }
                  addVpnStateListener((e) => {
                      console.log('e', e)
                    setVpnState(e);
                  });
                };
            
                observeVpn();
            
                return async () => {
                  if (Platform.OS === 'ios') {
                    await RNSimpleOpenvpn.stopObserveState();
                  }
                  removeVpnStateListener();
                };
    }, [regionInfo]);
    const HeaderLeft = () => {
        const navigation = useNavigation();
            const testClick = () => {
                console.log('testClick')
            }
        return (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <View style={{width: 55, height: 55, borderRadius: 25, backgroundColor: Colors.mainColor, alignItems: 'center', justifyContent: 'center', marginStart: 10}}>
                    <Image tintColor={Colors.mainBackground} source={Images.drawer} style={{width: 30, height: 30}}/>
                </View>
            </TouchableOpacity>
        );
    };
    const connectVpn = async () => {
        // Запускаем анимацию затемнения
        Animated.timing(opacity, {
            toValue: 1,  // 80% затемнения
            duration: 400,  // Длительность 0.4s
            easing: Easing.ease,  // Плавное ускорение и замедление
            useNativeDriver: true,
        }).start();
        let hashVpn = regionInfo?.vpnItem?.country + user.userid
        try {
            let filePath = `${RNFS.DocumentDirectoryPath}/vpnConfig/${hashVpn}`;
            let filePathConect = `${RNFS.DocumentDirectoryPath}/vpnConfig/`;
            // Проверяем, существует ли файл
            const fileExists = await RNFS.exists(filePath);
            console.log(filePath)
            if (fileExists) {
               await startOvpn(serverIp)
                //    Alert.alert('Файл уже существует', `Конфигурационный файл ${hashVpn}.ovpn уже есть.`);
              return;
            }
      
            // Создаем папку, если её нет
            let folderPath = `${RNFS.DocumentDirectoryPath}/vpnConfig`;
            let folderExists = await RNFS.exists(folderPath);
            if (!folderExists) {
              await RNFS.mkdir(folderPath);
            }
      
            // Отправляем запрос на создание файла
            setIsDownloading(true);
            let generateUrl = `http://10.0.2.2:8080/generate-ovpn`;
            let generateBody = {
              client_name: hashVpn,
              server_ip: serverIp,
            };
            let generateResponse = await fetch(generateUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(generateBody),
            });
            if (!generateResponse.ok) {
                
              throw new Error(`Ошибка при создании файла: ${generateResponse.statusText}`);
            }
      
            // Загружаем файл на устройство
            let downloadUrl = `http://10.0.2.2:8080/download-ovpn?client_name=${hashVpn}`;
            await RNFS.downloadFile({
              fromUrl: downloadUrl,
              toFile: filePath,
            }).promise;
      
            Alert.alert('Успех', `Файл ${hashVpn}.ovpn успешно загружен.`);
          } catch (error) {
            console.error('Ошибка:', error);
          } finally {
            setIsDownloading(false);
          }
        setStateConnect(true)
    }


    async function startOvpn(serverIp: any) {
        let hashVpn = regionInfo?.vpnItem?.country + user.userid;
        let filePath = `${RNFS.DocumentDirectoryPath}/vpnConfig/${hashVpn}.ovpn`;
        console.log('filePath ', filePath)
        try {
            // Читаем содержимое файла
            const ovpnConfig = await readOvpnFile(filePath);
            if (!ovpnConfig) {
                throw new Error('Ошибка загрузки конфигурации');
            }
    
            // Подключаем VPN с конфигурацией из строки
            await RNSimpleOpenvpn.connect({
                remoteAddress: serverIp,
                ovpnString: ovpnConfig, // Используем строку
                providerBundleIdentifier: 'com.example.RNSimpleOvpnTest.NEOpenVPN',
                localizedDescription: 'RNSimpleOvpn',
            });
            dispatch(setConectState(true))
            // navigation.navigate('ConnectionScreen') 
        } catch (error) {
            console.error('VPN connection error:', error);
            Alert.alert('Ошибка', `Не удалось подключиться: ${error}`);
        }
    }

    async function stopOvpn() {
        // dispatch(stopTimer())
        try {
            await RNSimpleOpenvpn.disconnect();
                // Запускаем анимацию возврата
            Animated.timing(opacity, {
                toValue: 0,  // Убираем затемнение
                duration: 400,  // Длительность 0.4s
                easing: Easing.ease,  
                useNativeDriver: true,
            }).start();
            // Alert.alert('VPN Disconnected', 'The VPN connection has been stopped.');
        } catch (error) {
            console.error('Error disconnecting VPN:', error);
            Alert.alert('Error', 'Failed to disconnect the VPN.');
        }
        dispatch(setConectState(false))
    }

    function printVpnState() {
        console.log(JSON.stringify(RNSimpleOpenvpn.VpnState, undefined, 2));
    }

    useEffect(() => {
        setMarkerPosition({
            latitude: startRegion.lat,
            longitude: startRegion.lon,
        })
    }, [startRegion]);
    useEffect(() => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(
                {
                    ...markerPosition,
                    latitudeDelta: 6.9922,
                    longitudeDelta: 6.9421,
                },
                1000 // время анимации в миллисекундах
            );
        }
    }, [markerPosition])

    useEffect(()=> {
        if(!selectCountry) {
            dispatch(setRegionInformation(regionInfo.defaultRegion))
            setMarkerPosition({
                latitude: regionInfo.defaultRegion.lat,
                longitude: regionInfo.defaultRegion.lon,
            })
        }
    }, [selectCountry])
    // Пример черно-белого стиля для карты
//     const onRegionChangeComplete = (region) => {
//         setMarkerPosition({
//       latitude: region.latitude,
//       longitude: region.longitude,
//     });
//   };

    const blackWhiteMapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#121314"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#383838"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2c2c2c"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#eeeeee"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"  // Чёрный цвет воды
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.customHeader}>
                {/* Передаем navigation через options */}
                <HeaderLeft />
                <Text style={styles.headerTitle}>SwipeVPN</Text>
                <View style={styles.headerIcon}></View>
            </View>
            {/* Карта */}
         <MapView
                style={styles.map}
                ref={mapViewRef}
                onMapReady={() => setIsMapLoaded(true)} // Когда карта готова, скрываем индикатор
                customMapStyle={blackWhiteMapStyle}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                initialRegion={{
                  latitude: startRegion.lat,
                  longitude: startRegion.lon,
                  latitudeDelta: 6.9922,
                  longitudeDelta: 6.9421,
                }}
              >
                {startRegion.longitude && (
                  <Marker coordinate={startRegion}>
                    <View style={styles.dotMap}>
                      <Dot />
                    </View>
                  </Marker>
                )}
              </MapView>
              <Animated.View style={[styles.overlay, { opacity } ]}>
                        <GradientOverlay mapLoad={true} />
                        <View style={styles.containerConnect} />
                </Animated.View>
            { regionInfo?.connectState ? (
                <>
                    <Animated.View style={[styles.overlay, { opacity } ]}>
                        <GradientOverlay mapLoad={false}/>
                        <View style={styles.containerConnect}>
                            <ConnectionScreen />   
                        </View>
                    </Animated.View>
                </>
              ): null
            }    
            <View style={styles.containerDot}>
                <MapDot city={startRegion.city} countryCode={startRegion.countryCode}/> 
            </View>    
            <View style={styles.bottomWrapper}>
                { !regionInfo?.connectState ? (
                    <>
                        <BaseButton theme='world' onPress={() => navigation.navigate('Regions')}/>
                        <Place isActive={selectCountry} onPress={() => {setSelectCountry(!selectCountry)}}/>   
                    </>
                ): null
                }
            </View>
            {/* <View  style={styles.currentConnection}>
				<CurrentLocationTimer countryName='Poland' cityName='Warsaw'/>
				<SpeedDownloadUpload/>
			</View> */}
            <View style={styles.swipecontainer}>
                <View style={styles.swipe}>
                    <SwipeSlider
                        status={regionInfo?.connectState}
                        isCountry={selectCountry}
                        text="Свайп!"
                        onCompleteRight={() => connectVpn()}
                        onCompleteLeft={() =>  stopOvpn()}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerIcon: {
        width: 55, 
        height: 55, 
        borderRadius: 25,
        tintColor: '#fff',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    customHeader: {
        position: 'absolute',
        top: 15,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        zIndex: 10, // Ensure it stays above the MapScreen
    },
    containerConnect: {
        height: '77%',
        bottom: 80
    },
    overlay: {
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',  // 100% высоты экрана
        // backgroundColor: 'black',
        zIndex: 2,  // Наложение поверх карты
    },
    overlayInner: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative'
    },
    header: {
        paddingTop: 50,
        paddingLeft: 20,
    },
    headerText: {
        fontSize: 24,
        color: '#00FF00',  // Неоновый зелёный
    },
    map: {
        flex: 1,
    },
    currentConnection: {
        position: 'absolute',
        bottom:'5%',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'column',
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        justifyContent: 'space-between',
        rowGap: 24,
      },
    marker: {
        width: 10,
        height: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    locationInfo: {
        position: 'absolute',
        top: '30%',
        left: '40%',
    },
    locationText: {
        fontSize: 18,
        color: 'white',
    },
    countrySelector: {
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    gif: {
        height: 273,
        width: 250,
    },
    flag: {
        width: 30,
        height: 20,
        marginRight: 10,
    },
    countryText: {
        fontSize: 18,
        color: 'white',
    },
    connectButton: {
        position: 'absolute',
        bottom: 30,
        left: '20%',
        right: '20%',
        backgroundColor: '#00FF00',
        padding: 15,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
    },
    buttonMenuWrapper: {
        width: '100%',
        marginTop:'5%',
        paddingLeft: '4%',
        paddingTop: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        position: 'absolute',
        left: 0,
        right:0,
        margin:0,
        paddingTop: '3%',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Montserrat-600',
        color: '#fff',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24.38,
        letterSpacing: 0.15000000596046448,
    },
    bottomWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        position: 'absolute',
        paddingTop: '140%',
        zIndex: 2
    },
    swipecontainer: {
        position: 'absolute',
        marginTop:'158%',
        zIndex: 2
    },
    swipe: {
        backgroundColor: '#1C1F20',
        width: '90%',
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 190,
        
    },
    dotMap: {
        // width: 30,
        // height: 34,
        // position: 'relative'
    },
    calloutContainer: {
        padding: 10,
        width: 650,
      },
      calloutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
      },
      calloutText: {
        fontSize: 14,
        color: 'gray',
      },
      containerDot: {
        position: 'absolute',
        marginTop:'73%',
        marginLeft: '36%'
      }
})
export default MapScreen;