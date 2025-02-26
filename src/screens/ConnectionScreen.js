import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
// import { useFonts } from "expo-font";
import BaseButton from './UI/BaseButton.js'
// import Swipe from './UI/Swipe.js'
// import ArrowCircle from '../assets/arrowCircle.svg'
// import Flag from '../assets/flag.svg'
import ChevronRight from '../assets/svg/ChevronRight.js';
import SvgComponent from './UI/GetSvg.tsx';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing } from "react-native-reanimated";
import SpeedDownloadUpload from './UI/SpeedDownloadUpload.js'
import BackgroundTimer from 'react-native-background-timer';
import { useNavigation } from '@react-navigation/native';
import { setTimeConnect } from '../store/serverinfo.js';



const ConnectionScreen = () => {

    const regionInfo = useSelector(state => state.regionInfo);
    const user = useSelector(state => state.user); 
    const dispatch = useDispatch();
    const translateY = useSharedValue(50); // Начальная позиция (чуть ниже)
    const opacity = useSharedValue(0); // Начальная прозрачность
    const scale = useSharedValue(1); // Масштаб для волны
    const [count, setCount] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        // Анимация появления (slide up + fade in)
        translateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) });
        opacity.value = withTiming(1, { duration: 1000 });
        // BackgroundTimer.runBackgroundTimer(() => {
        //     setCount(prevCount => prevCount + 1);
        //   }, 1000); // 1 second interval

        scale.value = withRepeat(withTiming(1.1, { duration: 1500, easing: Easing.ease }), -1, true);
        return () => {
            // BackgroundTimer.stopBackgroundTimer()
        }
      }, []);
    useEffect(()=> {
        if(!regionInfo.connectState) {
            BackgroundTimer.stopBackgroundTimer()
        }
    }, [regionInfo.connectState])

    useEffect(() => {
    // Фоновый таймер
    BackgroundTimer.runBackgroundTimer(() => {
        setCount(prevCount => {
        const newCount = prevCount + 1;
        setCount(newCount)
        dispatch(setTimeConnect(newCount)); // Обновляем состояние через Redux
        return newCount;
        });
    }, 1000); // 1 секунда

    return () => {
        BackgroundTimer.stopBackgroundTimer(); // Остановка таймера при размонтировании компонента
    };
    }, [dispatch])
    
      // Анимационный стиль для обертки
      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }, { scale: scale.value }],
        opacity: opacity.value,
        }));

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Часы
        const minutes = Math.floor((seconds % 3600) / 60); // Минуты
        const sec = seconds % 60; // Секунды
      
        // Возвращаем строку в формате hh:mm:ss
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
      };
//   const [fontsLoaded] = useFonts({
//     "Montserrat-500": require("../assets/fonts/Montserrat-Medium.ttf"),
//     "Montserrat-400": require("../assets/fonts/Montserrat-Regular.ttf"),
//     "Montserrat-300": require("../assets/fonts/Montserrat-Light.ttf"),
//   });
return (
	<View style={styles.container}>
        <View style={styles.content}>
            <Animated.View style={[animatedStyle]}>
                <FastImage
                    source={require('../assets/logo.gif')}
                    style={styles.gif}
                    resizeMode="contain" // Режим изменения размера
                />
            </Animated.View>    
        </View>
        <View>
            <Text style={styles.connectingTitle}>Connecting Time</Text>
            <Text style={styles.timer}>{formatTime(count)}</Text>
        </View>
        <SpeedDownloadUpload/>
        <TouchableOpacity onPress={() => navigation.navigate('Regions')}>
            <View style={styles.countryWrapper}>
                <View style={styles.firstBlock}>
                    {/* <Flag/> */}
                    <SvgComponent url={regionInfo?.vpnItem?.img} />
                    <View style={styles.locationWrapper}>
                        <Text style={styles.country}>{regionInfo?.vpnItem?.country}</Text>
                        <Text style={styles.city}>{regionInfo?.vpnItem?.city}</Text>
                    </View>
                </View>
                <ChevronRight style={styles.chevronRight}/>
                {/* <ChevronRight style={styles.chevronRight}/> */}
            </View>
        </TouchableOpacity>
        {/* <View style={styles.swipe}>
            <SwipeSlider
                status={regionInfo?.connectState}
                text="Свайп!"
            />
        </View> */}
	</View>
)
}
const styles = StyleSheet.create({
    content: {
            //   height: '60%'
    },
	container: {
	      flex: 1,
          position: 'relative',
          justifyContent: 'flex-end',
        //   backgroundColor: '#000',
          paddingBottom: 30,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '80%',
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
        background: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: '40%',
            top: '-60%',
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
        line: {
            height: 1,
            width: 40,
            backgroundColor: '#4A4A61',
            transform: [
                  { rotate: '90deg' },
                ],
          },
          gif: {
              height: 273,
              width: 250,
          },
        connectingTitle: {
            color:'#E7FE55',
            fontFamily: 'Montserrat-500',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 19.5,
            letterSpacing: 0.4000000059604645,
            textAlign: 'center',
        },
        timer: {
            color: '#fff',
            fontFamily: 'Montserrat-500',
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 39,
            letterSpacing: 0.25,
            textAlign: 'center',
        },
        transfer: {
            height: 48,
            marginLeft: '10%',
            marginRight: '10%',
            flexDirection: 'row',
            alignItems: 'center',
        },
        transferItem: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 12,
        },
        downloadText: {
            color: '#566379',
            fontFamily: 'Montserrat-400',
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 19,
            letterSpacing: 0.5,
        },
        download: {
            flexDirection: 'column',
            columnGap: 4,
            width: 'auto',
        },
        speedWrapper: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'flex-end',
            columnGap: 5,
        },
        speed: {
        fontFamily: 'Montserrat-500',
                    fontSize: 20,
                    fontWeight: 400,
                    lineHeight: 24.38,
                    letterSpacing: 0.25,
                    color: '#fff',
        },
        speedRate: {
            color: '#566379',
                    fontFamily: 'Montserrat-300',
                                fontSize: 14,
                                fontWeight: 400,
                                lineHeight: 17,
                                letterSpacing: 0.25,
                                color: '#fff'
        },
        arrow: {
            color: '#fff',
            width: 24,
            height: 24,
        },
		countryWrapper: {
			height: 68,
			width: '95%',
			padding: 12,
			backgroundColor: '#E7FE55',
			flexDirection: 'row',
			borderRadius: 22,
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: '3%'
		},
		chevronRight: {
			color: '#000'
		},
		locationWrapper: {
			marginLeft: 12,
		},
		firstBlock: {
			flexDirection: 'row',
		},
		country: {
			fontFamily: 'Montserrat-500',
	        fontSize: 16,
	        fontWeight: 500,
	        lineHeight: 19.5,
	        color: '#000'
		},
		city: {
		fontFamily: 'Montserrat-400',
        	        fontSize: 16,
        	        fontWeight: 400,
        	        lineHeight: 19.5,
        	        color: '#000'
		},
		swipe: {
			width: '95%',
			marginTop: '4%'
		}
})

export default ConnectionScreen;