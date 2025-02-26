import {View, Button, Text, StyleSheet, Image, Alert, TouchableOpacity} from 'react-native';
// import { useFonts } from "expo-font";
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgComponent from './GetSvg';
import { setDefailtVpn, setVpnItem } from '../../store/serverinfo';
import { setRegionInformation } from '../../store/serverinfo';


const Place = ({isActive, onPress}) => {

    const dispatch = useDispatch()
    const serverState = useSelector(state => state.regionInfo.defaultVpn)
    const itemVpn = useSelector(state => state.regionInfo.vpnItem)

    const selectItem = () => {
        if (!Boolean(Object.keys(itemVpn).length)) {
            dispatch(setVpnItem(serverState))
        }
        // Add your selectItem logic here
    }
    useEffect(()=> {
        if (Boolean(Object.keys(itemVpn).length)) {
            dispatch(setDefailtVpn(itemVpn))
        }
    }, [itemVpn])
    async function getCoordinates(ip) {
        console.log(ip)
        const response = await fetch(`http://ip-api.com/json/${ip ? ip : serverState.ip}`);
        const data = await response.json();
        if (data.status === "success") {
            dispatch(setRegionInformation(data))  
            console.log(`Latitude: ${data.lat}, Longitude: ${data.lon}`);
            return { latitude: data.lat, longitude: data.lon };
        } else {
            console.error("Unable to fetch coordinates.");
        }
    }
    const handlePress = () => {
        onPress();
        if(!isActive) {
            selectItem();
            getCoordinates(itemVpn.ip)        }
    }
  // const [fontsLoaded] = useFonts({
  //   "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  // });
return (
<View style={[styles.container, isActive ? styles.active : styles.disabled]} >
    { serverState ? (
        <>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.wrapper}>
                    <SvgComponent url={serverState.img} widthStyle='34' heightStyle='34'/>
                    <Text style={styles.text}>{serverState.city},{serverState.coutry_short}</Text>
                </View>
            </TouchableOpacity>  
        </>
    ): null}
</View>
);
}
const styles = StyleSheet.create({
    containerImg: {
        width: 44,
        height: 44
    },
    container: {
        borderWidth: 1,
        height:48,
        borderRadius: 24,
        backdropFilter: 'blur(9.600000381469727px)',
    },
    wrapper: {
            paddingLeft: 4,
            paddingTop: 6,
            paddingBottom:6,
            paddingRight: 12,
                   flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
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