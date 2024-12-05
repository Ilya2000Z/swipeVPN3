import { View, Button, Text } from 'react-native';
import { Platform, StyleSheet } from 'react-native';
import LogoSvg from '../assets/svg/logo.js'
const StartScreen = () => {
  // const [fontsLoaded] = useFonts({
  //   "Montserrat-600": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  // });
	return(
	<View style={styles.container}>
		<View style={styles.wrapper}>
			<View style={styles.logo}>
				<LogoSvg/>
			</View>
			<View style={styles.text}>
				<Text style={styles.title}>SwipeVPN</Text>
				<Text style={styles.version}>Version 1.0</Text>
			</View>
		</View>
	</View>
	);
};
export default StartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    wrapper: {

    },
    logo: {
		margin: 'auto',
		marginTop: 130,
        maxHeight: 'auto',
    },
    text: {
        marginTop:0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
		fontFamily: 'Montserrat-600',
		color: '#fff',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 48.76,
        letterSpacing: 0.15,
        textAlign: 'center',
    },
    version: {
	    fontFamily: 'Montserrat-600',
        color: '#fff',
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 40,
        letterSpacing: 0.1,
        textAlign: 'center',
    }
  })
