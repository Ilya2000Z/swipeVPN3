import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet,Pressable,Image,ImageBackground } from 'react-native';
import { Platform } from 'react-native';
import DotsSvg from '../assets/svg/dots.js';
import ChevronsSvg from '../assets/svg/chevrons.js';
import ChevronsDisabled from '../assets/svg/chevronsDisabled.js';

const SwipeButton = (props: { isDisabled: any; }) => {
  // const [fontsLoaded] = useFonts({
  //   "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  // });
    return (
        <View>
            <View style={styles.track}>
                <Pressable style={[styles.thumb, props.isDisabled ? styles.disabled : styles.active]}>
                    <DotsSvg/>
                </Pressable>
                <Text style={[styles.text, props.isDisabled ? styles.disabledText : styles.activeText]}>Connect</Text>
                { !props.isDisabled && <ChevronsSvg/> }
                { props.isDisabled && <ChevronsDisabled/> }
            </View>
        </View>
      );
};

  const styles = StyleSheet.create({
    track: {
        height: 74,
        backdropFilter: 'blur(4.800000190734863px)',
        borderWidth: 1,
        borderColor: '#1C1F20',
        borderStyle: 'stroke',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        paddingRight: 24,
        borderRadius: 190,
    },
    thumb: {
        width: 76,
        height: '100%',
        maxHeight: 66,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 34,
    },
    active: {
        backgroundColor: '#fff',
    },
    disabled: {
        backgroundColor: '#3A3A3A',
    },
    text: {
        fontFamily: 'Montserrat-500',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 19.5,
    },
    disabledText: {
        color: '#566379',
    },
    activeText: {
        color: '#fff',
    },
  });

export default SwipeButton;
