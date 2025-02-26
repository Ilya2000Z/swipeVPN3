import { StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { useFonts } from "expo-font";
const ContinueButton = ({ isActive, onPress }) => {
  // const [fontsLoaded] = useFonts({
  //    "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  // });
	return(
        <TouchableOpacity
            style={[styles.button, !isActive && styles.disabled]}
            onPress={isActive ? onPress : null} // Only call onPress if the button is active
            disabled={!isActive} // Prevent interactions when disabled
            accessible={true}
            accessibilityLabel="Continue Button"
        >
            <Text style={[styles.buttonText, !isActive && styles.disabledText]}>Continue</Text>
        </TouchableOpacity>
	)
}

const styles = StyleSheet.create({
    button: {
		backgroundColor: '#E7FE55',
		borderRadius: 22,
		height: 58,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: '#3A3A3A',
    },
    disabledText: {
        color: '#666666',
        width: '100%',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-500',
        color: '#000000',
        fontSize: 28,
        fontWeight: 500,
        lineHeight: 34,
    }
  })
export default ContinueButton;