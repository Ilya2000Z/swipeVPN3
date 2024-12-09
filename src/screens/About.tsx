import React from 'react';
import { Text, View} from 'react-native';
import LogoSvg from '../assets/svg/logo';
import {Colors} from "../theme/Colors.ts";

const About = () => {
    return(
        <View style={{flex: 1, backgroundColor: Colors.mainBackground, justifyContent: 'center', alignItems:'center', padding: 30}}>
            <LogoSvg />
            <Text style={{color: 'white', fontSize: 40}}>SwipeVPN</Text>
            <Text style={{color: 'white', fontSize: 15, marginTop: 20}}>Version 1.0</Text>
            <View style={{flex: 1}} />
            <Text style={{color: 'white', fontSize: 13, marginBottom: 20, textDecorationLine: 'underline'}}>Terms of service</Text>
            <Text style={{color: 'white', fontSize: 13, marginBottom: 30, textDecorationLine: 'underline'}}>Privacy policy</Text>
        </View>
    );
};

export default About;
