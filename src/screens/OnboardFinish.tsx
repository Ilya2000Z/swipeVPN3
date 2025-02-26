import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { View, Button, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import Honeycomb from  '../assets/svg/honeycomb.js'
import ContinueButton from './UI/ContinueButton'
import HoneycombAnimation from '../assets/svg/HoneycombAnimation.js';
import { useEffect, useState } from 'react';

const OnboardFinish = ( { navigation }) => {
    const [progresState, setProgresState] = useState(0.8)
//   const [fontsLoaded] = useFonts({
//     "Montserrat-600": require("../assets/fonts/Montserrat-SemiBold.ttf"),
//     "Montserrat-400": require("../assets/fonts/Montserrat-Regular.ttf"),
//      "Montserrat-500": require("../assets/fonts/Montserrat-Medium.ttf"),
//   });
useEffect(()=> {
    setTimeout(() => {
        setProgresState(1)
    },2000)
}, [])
const loadScen = () => {
    navigation.navigate('Subscription');
}
	return(
	<View style={styles.container}>
        <View style={styles.wrapper}>
			<Progress.Bar style={styles.progress} progress={progresState} width={null} color={'#E7FE55'} borderWidth={0} borderRadius={2} unfilledColor={'#566379'}/>
			<View style={styles.Honeycomb}>
                {/* <Honeycomb/> */}
                <HoneycombAnimation />
            </View>
			<Text style={styles.text}>Configuring the configuration for your purposes</Text>
			<ContinueButton isActive={progresState !=0.8} onPress={loadScen} />
            <Text style={styles.terms}>
                By continuing, you accept the{"\n"}{' '}
                <TouchableOpacity>
                    <Text style={styles.termsActive}>Privacy Policy</Text>
                </TouchableOpacity>
                {' '}and{' '}
                <TouchableOpacity>
                    <Text style={styles.termsActive}>Terms of Use</Text>
                </TouchableOpacity>
            </Text>
		</View>
	</View>
	)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        paddingTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    Honeycomb: {
        margin: "auto"
    },
    wrapper: {
        marginLeft: 16,
        marginRight: 16,
        flex: 1,
        justifyContent: 'space-between',
    },
    honeycomb: {
        margin: 'auto',
    },
    text: {
        color: '#fff',
        fontFamily: 'Montserrat-600',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24.38,
        textAlign: 'center',
        marginBottom: '50%',
    },
    termsActive: {
        fontFamily: 'Montserrat-500',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 14.63,
        color: '#E7FE55',
        marginBottom:-3,
    },
    terms: {
        fontFamily: 'Montserrat-400',
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 14.63,
        color: '#566379',
        textAlign: 'center',
        marginTop: 12,
    },

})
export default OnboardFinish;