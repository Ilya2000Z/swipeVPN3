import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet,Pressable,Image,ImageBackground, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { SvgUri } from "react-native-svg";
import MenuSvg from "../../assets/svg/menu"
import WorldSvg from "../../assets/svg/world.js"
import Exit from "../../assets/svg/exit"
import Search from "../../assets/svg/search"

const BaseButton = (props) => {
return (
    <View>
       <TouchableOpacity onPress={props.onPress}>
          <View>
          {props.theme==='menu' && <Pressable style={styles.svgWrapper}>
              <MenuSvg style={styles.svg} />
          </Pressable>}
          { props.theme==='world' && <Pressable style={styles.svgWrapper}>
              <WorldSvg style={styles.svg} />
          </Pressable>}
          { props.theme==='exit' && <Pressable style={styles.svgWrapper}>
              <Exit style={styles.svg} />
          </Pressable>}
          { props.theme==='search' && <Pressable style={styles.svgWrapper}>
              <Search style={styles.svg} />
          </Pressable>}
          </View>
        </TouchableOpacity>
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
