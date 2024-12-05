import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { useFonts } from "expo-font";
import {useState} from 'react';

const Place = (props) => {
  // const [fontsLoaded] = useFonts({
  //   "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  // });
  const [isActive, setIsActive] = useState(false);
return (
<View style={[styles.container, !isActive ? styles.active : styles.disabled]}>
    {/*<Image source={require('../assets/NL.png')}/>*/}
    <Text style={styles.text}>Amsterdam, NL</Text>
</View>
);
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        maxWidth: 'auto',
        height:48,
        borderRadius: 24,
        backdropFilter: 'blur(9.600000381469727px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 4,
        paddingTop: 6,
        paddingBottom:6,
        paddingRight: 12,
    },
    disabled: {
        borderColor: '#FFFFFF1A',
    },
    active: {
        backgroundColor: '#E7FE553D',
        borderColor: '#E7FE55',
    },
    text: {
        color: '#fff',
        marginLeft: 12,
        fontFamily: 'Montserrat-500',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 19.5,

    }
})
export default Place;
