import { Image, View, Button, Text, ImageBackground } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
// import { useFonts } from "expo-font";
import Dot from '../../assets/svg/dot'

const MapDot = ({countryCode, city, isActive}) => {

  // const [fontsLoaded] = useFonts({
  //   "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  // });

  return (
    <View style={styles.container}>
	    <View style={styles.wrapper}>
	        <View style={[styles.row, isActive ? styles.isActive : styles.title]}>
            <>
            {
              isActive ? (<Image source={require('../../assets/radio.png')} style={{ width: 24, height: 24, marginRight: 7 }} />): null
            }
            </>
            <Text style={styles.text}>{city}, {countryCode}</Text></View>
			    <Dot style={styles.dot}/>
	    </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      justifyContent: 'flex-end',
      // backgroundColor: '#000',
      paddingBottom: 30,
    },
    row: {
      flexDirection: 'row', // Размещает элементы в строку
      alignItems: 'center', // Выравнивает по центру по вертикали
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
        width: 24,
        height: 24,
    },
    title: {
      height: 40,
      paddingTop: 10,
      paddingBottom:10,
      paddingRight: 12,
      paddingLeft: 12,
      borderRadius: 24,
      borderWidth: 1,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      backgroundColor: '#424242b5'
    },
    isActive: {
      height: 40,
      paddingTop: 10,
      paddingBottom:10,
      paddingRight: 12,
      paddingLeft: 12,
      borderRadius: 24,
      borderWidth: 1,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#E7FE55',
      backgroundColor: '#E7FE553D',
    },
    text: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Montserrat-600',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 20,
    },
  })
export default MapDot;