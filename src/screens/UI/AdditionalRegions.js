import React from 'react';
import { View, Text, StyleSheet, ImageBackground,
  // Dimensions
} from 'react-native';
// import { useFonts } from "expo-font";
// import BaseButton from './BaseButton.js'
import BannerRegions from '../../assets/banner-regions.png';
// import PL from '../../assets/svg/PL.js';
import UA from '../../assets/svg/UA.js';
import USA from '../../assets/svg/USA.js';
import Plus from '../../assets/svg/plus.js';

const AdditionalRegions = () => {
  // const { width, height } = Dimensions.get('window');
  // const [fontsLoaded] = useFonts({
  //   "Montserrat-700": require("../../assets/fonts/Montserrat-Bold.ttf"),
  //    "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  //   "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  // });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ImageBackground style={styles.background}
          resizeMode="contain" source={BannerRegions} />
        <View style={styles.text}>
          <Text style={styles.textQuestion} numberOfLines={3} ellipsizeMode="tail">Do you need additional regions?</Text>

          <View style={styles.countriesWrapper}>
            <View style={styles.flags}>
              <View style={styles.flag}>
                <UA style={styles.flagBord} />
              </View>
              <View style={[styles.flag, styles.flagOverlay]}>
                <USA style={styles.flagBord} />
              </View>
              <View style={[styles.flag, styles.flagOverlay, styles.flagOverlayAdd]}>
                <Plus style={styles.flagBord} />
              </View>
            </View>
            <Text style={styles.countries}>Europe, USA, Canada</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 184,
  },
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  background: {
    width: '106%',
    height: '100%',
    zIndex: 0,
  },
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textQuestion: {
    maxWidth: '80%',
    flexDirection: 'column',
    padding: 8,
    width: '100%',
    fontFamily: 'Montserrat-500',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 40,
    color: '#fff',
  },
  countries: {
    fontFamily: 'Montserrat-400',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#fff',
    letterSpacing: 0.004,
  },
  countriesWrapper: {
    marginTop: 12,
    marginLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  flags: {
    flexDirection: 'row',
    width: 60,
  },
  flagBord: {
    width: 25,
    height: 25,
  },
  flag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: '50%',
    backgroundColor: '#fff',
  },
  flagOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 17,
  },
  flagOverlayAdd: {
    marginLeft: 35,
  },
  addCountry: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
});
export default AdditionalRegions;
