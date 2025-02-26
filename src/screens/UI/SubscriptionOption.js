import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
// import { useFonts } from "expo-font";

const SubscriptionOption = (props) => {
  // const [fontsLoaded] = useFonts({
  //    "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  //    "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  // });
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.container, props.isActive && styles.active]}>
          <Text style={styles.title}>{props.title}</Text>
          {props.popular && <View style={styles.labelWrapper}><Text style={styles.labelText}>Popular</Text></View>}
          {props.discount && <View style={[styles.labelWrapper, styles.discount]}><Text style={[styles.labelText, styles.labelTextDiscount]}>{props.discount}</Text></View>}
          <View style={styles.wrapper}>
            <Text style={styles.value}>{props.subtitle}</Text>
            <Text style={styles.duration}>{props.duration}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF17',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    position: 'relative',
  },
  active: {
    backgroundColor: '#E7FE553D',
    borderColor: '#E7FE55'
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Montserrat-600',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.5,
  },
  value: {
    color: 'white',
    fontFamily: 'Montserrat-600',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 39.01,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  duration: {
    color: 'white',
    color: '#566379',
    fontFamily: 'Montserrat-500',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17.07,
    textAlign: 'center',
    marginBottom: 5,
    marginLeft: 4,
  },
  labelWrapper: {
    position: 'absolute',
    right:-1,
    top:0,
    maxWidth: '27%',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#E7FE55',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
    paddingLeft: 16,
  },
  discount: {
    backgroundColor: 'transparent',

  },
  labelText: {
    fontFamily: 'Montserrat-500',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17.07,
    textAlign: 'center',
  },
  labelTextDiscount: {
    color: '#B6FF63',
  }
});

export default SubscriptionOption;