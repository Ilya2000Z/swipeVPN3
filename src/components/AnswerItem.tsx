import { View, Button, Text, Pressable } from 'react-native';
import { Platform, StyleSheet, FlatList, Image } from 'react-native';
import { useFonts } from "expo-font";
import {useState} from 'react';
import Svg, { Path } from "react-native-svg";
import WorldSvg from '../../svg/world.js'

const AnswerItem = (prop) => {
	const [isChecked,setIsChecked] = useState(false)
	const onPressFunction = () => {
		setIsChecked(!isChecked)
		console.log(prop)
	}
	return(
		<View style={styles.container}>
            <Pressable style={[styles.wrapper, isChecked ? styles.checked : '']} onPress={onPressFunction}>
                  {prop.data.image}
                  <Text style={styles.text}> {prop.data.name}</Text>
                  <View style={styles.radioWrapper}>
                      <Text style={[styles.radio, isChecked ? styles.radioActive : '']}/>
                      {isChecked && <Text style={styles.dot}/>}
                  </View>
                </Pressable>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	},
	image: {
      width: 30,
      height: 30,
    },
	wrapper: {
		width: '100%',
		height: 64,
		backgroundColor: '#1E1E1E',
		borderRadius: 12,
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight:12,
		paddingBottom: 15,
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
	},
	checked: {
		borderWidth: 1,
		borderColor: '#E7FE55',
		backgroundColor: '#E7FE553D',
	},
	text: {
		color: '#fff',
        marginLeft: 12,
	},
	radioWrapper: {
		position: 'relative',
	},
	dot: {
		position: 'absolute',
		width: 8,
		height: 8,
		borderRadius: 50,
		top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: -5 }],
		backgroundColor: '#000'
	},
	radio: {
		width: 24,
		height: 24,
		borderWidth: 1,
		borderColor: '#566379',
		borderRadius: 50,
	},
	radioActive: {
		backgroundColor: '#E7FE55',
	}
})
export default AnswerItem