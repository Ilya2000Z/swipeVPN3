import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet,Pressable,Image,ImageBackground } from 'react-native';
import { Platform } from 'react-native';
import { SvgUri } from "react-native-svg";
import MenuSvg from '../assets/svg/menu.js'
import WorldSvg from '../assets/svg/world.js'

const BaseButton = (props) => {
return (
    <View>
        {props.theme==='menu' && <Pressable style={styles.svgWrapper}>
            <MenuSvg style={styles.svg} />
        </Pressable>}
                { props.theme==='world' && <Pressable style={styles.svgWrapper}>
                    <WorldSvg style={styles.svg} />
                </Pressable>}
    </View>
  );
};
  const styles = StyleSheet.create({
    svg: {
      width: 24,
      height: 24,
    },
    svgWrapper: {
        backgroundColor: '#E7FE55',
        padding: 12,
        borderRadius: 22,
        width:48,
        height:48,
    }
  })

export default BaseButton;
