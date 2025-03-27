import React from 'react';
import { TextInput, View, Text} from 'react-native';
import { Platform, StyleSheet, ScrollView } from 'react-native';

// import { useFonts } from "expo-font";

const SearchItem = (props) => {
//   const [fontsLoaded] = useFonts({
//   "Montserrat-700": require("../../assets/fonts/Montserrat-Bold.ttf"),
//   "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
//     "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
//     "Montserrat-400": require("../../assets/fonts/Montserrat-Regular.ttf"),
//     "Montserrat-300": require("../../assets/fonts/Montserrat-Light.ttf"),
//   });
	return (
    	<View style={styles.container}>
    	    <View style={styles.wrapper}>
	            <props.image/>
	            <View style={styles.textWrapper}>
	                <Text style={styles.title}>{props.title}</Text>
	                <Text  style={styles.subtitle}>{props.subtitle}</Text>
	            </View>
			</View>
    	</View>
)
}
const styles = StyleSheet.create({
	textWrapper: {
		flexDirection: 'column',
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		columnGap: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#2D2D2DBF',
		paddingVertical: 12,
	},
	title: {
        fontFamily: 'Montserrat-500',
        color: '#fff',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 500,
	},
	subtitle: {
		color: '#566379',
        fontFamily: 'Montserrat-400',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 400,
	},
})
export default SearchItem;