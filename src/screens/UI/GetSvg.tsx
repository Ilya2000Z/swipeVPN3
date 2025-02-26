import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface svgType {
    url: string,
    style: any,
    widthStyle: string,
    heightStyle: string
}

const SvgComponent = (props: svgType) => {
  const [svgXml, setSvgXml] = useState('');
  useEffect(() => {
    fetch(props.url)
      .then(response => response.text())
      .then(data => setSvgXml(data))
      .catch(error => console.error(error));
  }, []);

  return <View style={props.style ? styles.disable:''}>{svgXml ? <SvgXml xml={svgXml} width={props.widthStyle ? props.widthStyle: '44'} height={props.heightStyle ? props.heightStyle: '44'} /> : null}</View>;
};
const styles = StyleSheet.create({
  disable: {
    opacity: 0.6,
  }
})
export default SvgComponent;
