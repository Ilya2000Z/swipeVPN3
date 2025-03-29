import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { useFonts } from "expo-font";

import ChevronRight from '../../assets/svg/ChevronRight';
import More from '../../assets/svg/more';
import SvgComponent from './GetSvg';
import Ping from '../../assets/svg/ping';

const CountryItem = (props) => {
// const [fontsLoaded] = useFonts({
// "Montserrat-700": require("../../assets/fonts/Montserrat-Bold.ttf"),
//  "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
// "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
// });

return (
  props.isFree === true ? (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View style={[styles.wrapper]}>
        <SvgComponent url={props.flag} widthStyle={props.width} heightStyle={props.height} />
          <View
            style={[
              styles.textWrapper,
              !props.isSubscriptionActive && styles.disable,
            ]}
          >
            {props.countryName ? (<>
              <Text style={[styles.textCountry, props?.style]}>{props.countryName}</Text>
            </>): null}
            {props.cityName ? (<>
              <Text style={[styles.textCity, props?.style]}>{props.cityName}</Text>
            </>): null}
          </View>
            {props.ping === true && <Ping/>}
            {(props.isFree === true && !props.ping && !props.more) && <ChevronRight style={styles.chevronRight}/>}
            {props.isFree === false || props.more && <More/>}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <View style={styles.container}>
     <View style={styles.container}>
        <View style={[styles.wrapper]}>
          <SvgComponent url={props.flag} style={props.isSubscriptionActive === false} widthStyle={props.width} heightStyle={props.height} />
          <View
            style={[
              styles.textWrapper,
              props.isSubscriptionActive === false ? styles.disable  : null,
            ]}
          >
            {props.countryName ? (<>
              <Text style={[styles.textCountry, props?.style]}>{props.countryName}</Text>
            </>)
            :
            null}
            {props.cityName ? (<>
              <Text style={[styles.textCity, props?.style]}>{props.cityName}</Text>
            </>)
            :
            null}
          </View>
          <TouchableOpacity onPress={props.onPress}>
            <More />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2DBF',
    height: '68',
  },
  textWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  textCountry: {
    color: '#fff',
    fontFamily: 'Montserrat-500',
    fontSize: 16,
    fontWeight: 500,
  },
textCity: {
	marginTop: 4,
  // color: '#fff',
  fontFamily: 'Montserrat-400',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 19.5,
  color: '#566379',
},
chevronRight: {
	color: '#fff',
	width: 24,
	height: 24,
},
disable: {
	opacity: 0.6,
},
});

export default CountryItem;
