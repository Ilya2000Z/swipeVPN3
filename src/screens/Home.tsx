import React from 'react';
import { View, Button, Text } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import BaseButton from '../components/BaseButton.tsx';
import Place from '../components/Place.tsx';
import Swipe from '../components/Swipe.tsx';

const Home = () => {

    // const [fontsLoaded] = useFonts({
    //     'Montserrat-600': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    // });

    return (
        <View style={styles.container}>
            <View style={styles.buttonMenuWrapper}>
                <BaseButton theme="menu"/>
                <Text style={styles.title}>SwipeVPN</Text>
            </View>
            <View style={styles.bottomWrapper}>
                <BaseButton theme="world"/>
                <Place/>
            </View>
            <View>
                <View style={styles.swipe}>
                    <Swipe isDisabled="true"/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end',
        backgroundColor: '#121314',
        paddingBottom: 30,
    },
    buttonMenuWrapper: {
        position: 'absolute',
        top: 32,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Montserrat-600',
        color: '#fff',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24.38,
        letterSpacing: 0.15000000596046448,
    },
    bottomWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    swipe: {
        marginTop:16,
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
});
export default Home;
