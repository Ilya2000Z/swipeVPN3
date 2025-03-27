import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import SvgComponent from './GetSvg';
import { useSelector } from 'react-redux';
// import { useFonts } from "expo-font";

const CurrentLocationTimer = (props) => {
  const regionInfo = useSelector(state => state.regionInfo);
	  // const [fontsLoaded] = useFonts({
    //     "Montserrat-700": require("../../assets/fonts/Montserrat-Bold.ttf"),
    //      "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
    //     "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    //   });
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600); // Часы
      const minutes = Math.floor((seconds % 3600) / 60); // Минуты
      const sec = seconds % 60; // Секунды
    
      // Возвращаем строку в формате hh:mm:ss
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };
  return (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            {/* <props.flag width={46} height={46}/> */}
            <SvgComponent url={props.img} widthStyle='46' heightStyle='46' />
            <View style={styles.textWrapper}>
                <Text style={styles.textCountry}>{props.countryName}</Text>
                <Text style={styles.textCity}>{props.cityName}</Text>
            </View>
            <Text style={styles.timer}>{formatTime(regionInfo.time)}</Text>
        </View>
    </View>
  )
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 16,
     justifyContent: 'center',
   },
   wrapper: {
     width: '100%',
     justifyContent: 'space-between',
     height: 46,
     flexDirection: 'row',
   },
     textWrapper: {
       flex: 1,
       marginLeft: 12,
     },
     textCountry: {
       color: '#fff',
       fontFamily: 'Montserrat-700',
       fontSize: 16,
       fontWeight: 700,
       lineHeight: 19.5,
     },
   textCity: {
   	 marginTop: 4,
     color: '#fff',
     fontFamily: 'Montserrat-400',
     fontSize: 16,
     fontWeight: 400,
     color: '#566379',
     lineHeight: 19.5,
   },
   timer: {
       color: '#A1A1AC',
       fontFamily: 'Montserrat-500',
       fontSize: 32,
       fontWeight: 500,
       lineHeight: 39,
       letterSpacing: 0.25,
       textAlign: 'center',
   },
 })

 export default CurrentLocationTimer;