import React from 'react';
import { TextInput, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import CitiesList from './UI/CitiesList';
import SearchItem from './UI/SearchItem'
import CountryItem from './UI/CountryItem'
import ArrowLeft from '../assets/svg/arrowLeft';
import WorldSearch from '../assets/svg/worldSearch';
import MapPin from '../assets/svg/map-pin';
import Server from '../assets/svg/server';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from 'react-native-reanimated';
import { setVpnItem } from '../store/serverinfo';

// import PL from '../assets/flags/PL.svg'
// import US from '../assets/flags/US.svg'

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Search = () => {

	const pay = useSelector(state => state.regionInfo.serverItems.payload.pay);
	const [text, onChangeText] = React.useState('');
	const navigator = useNavigation()
	const [selcetItemRgion, setSelectItemRegion] = useState()
	const [visible, setVisible] = useState(false);
	const translateY = useSharedValue(SCREEN_HEIGHT);
	const regionInfo = useSelector(state => state.regionInfo);
	const navigate = useNavigation()
	const dispatch = useDispatch()


	const findAndConvertVPN = (data, searchCriteria) => {
		let result = null;

		// Поиск среди бесплатных серверов
		if (data.isFree) {
			result = data.isFree.find(server =>
				(server.country_short === searchCriteria.country_short || server.coutry_short === searchCriteria.country_short) &&
				server.id === searchCriteria.id &&
				server.ip === searchCriteria.ip
			);

			if (result) {
				result = { ...result, city: result.city }; // Добавляем город
			}
		}

		// Поиск среди платных серверов, если не найдено среди бесплатных
		if (!result && data.pay) {
			for (const country of data.pay) {
				for (const city of country.cityItem) {
					const foundServer = city.servers.find(server =>
						(server.country_short === searchCriteria.country_short || server.coutry_short === searchCriteria.country_short) &&
						server.id === searchCriteria.id &&
						server.ip === searchCriteria.ip
					);
					if (foundServer) {
						result = { ...foundServer, img: country.img, city: city.city }; // Добавляем город
						break;
					}
				}
				if (result) break;
			}
		}

		return result ? result : null;
	};

	const selectServer = (itemServer) => {
		console.log(itemServer)
		dispatch(setVpnItem(findAndConvertVPN(regionInfo.serverItems.payload, itemServer)))
		navigate.navigate('MapScreen')
	}

	function findParentObject(target, data) {
		if (target.isFree) {
			return data.isFree.find(item => item.country === target.country) || null;
		} else {
			return data.pay.find(item => item.country === target.country) || null;
		}
	}
	const openModal = (item) => {
		setSelectItemRegion(findParentObject(item, regionInfo.serverItems.payload))
		console.log('selcetItemRgion ', selcetItemRgion)
		runOnJS(setVisible)(true);
		translateY.value = withTiming(0); // Открыть модальное окно с анимацией
	};
	// Улучшенный свайп вниз
	const closeModal = () => {
		translateY.value = withTiming(SCREEN_HEIGHT, {}, () => {
			runOnJS(setVisible)(false); // Закрыть модальное окно
		});
	};
	// Улучшенный свайп вниз
	const swipeDown = Gesture.Pan()
		.onUpdate((event) => {
			translateY.value = Math.max(0, event.translationY); // Перемещать вниз только до 0
		})
		.onEnd((event) => {
			if (event.translationY > SCREEN_HEIGHT * 0.25) {
				runOnJS(closeModal)();// Закрыть, если свайп достаточно сильный
			} else {
				translateY.value = withTiming(0); // Вернуть в исходное положение
			}
		});
	// Анимационный стиль модального окна
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}));

	const goBack = () => {
		console.log('test')
		navigator.navigate('Regions')
	}
	const allCountries = [
		...pay.map(item => ({
			country: item.country,
			img: item.img,
			isFree: false,
			countryShort: item.coutry_short
		}))];

	const allCities = [
		...pay.flatMap(item =>
			item.cityItem.map(city => ({
				city: city.city,
				country: item.country,
				img: item.img,
				isFree: false,
				countryShort: item.coutry_short
			}))
		)];

	const allServers = [
		...pay.flatMap(item =>
			item.cityItem.flatMap(city =>
				city.servers.map(server => ({
					ip: server.ip,
					city: city.city,
					isFree: false,
					countryShort: server.country_short,
					id: server.id,
					ping: Boolean(server.ping)
				}))
			)
		)];
	const filteredCountries = allCountries.filter(c =>
		c.country.toLowerCase().includes(text.toLowerCase())
	);

	const filteredCities = allCities.filter(c =>
		c.city.toLowerCase().includes(text.toLowerCase())
	);

	const filteredServers = allServers.filter(s =>
		s.countryShort.includes(text)
	);
	const HighlightText = ({ text = '', highlight = '' }) => {
		if (!highlight.trim()) return <Text style={styles.text}>{text}</Text>;

		const regex = new RegExp(`(${highlight[0]})`, 'i'); // Только первая буква
		const matchIndex = text.search(regex); // Найти индекс первой совпадающей буквы

		if (matchIndex === -1) return <Text style={styles.text}>{text}</Text>;

		return (
			<Text style={styles.text}>
				{text.substring(0, matchIndex)}
				<Text style={styles.highlight}>{text[matchIndex]}</Text>
				{text.substring(matchIndex + 1)}
			</Text>
		);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.search}>
					<TouchableOpacity onPress={() => goBack()}>
						<ArrowLeft />
					</TouchableOpacity>
					<TextInput
						style={styles.input}
						onChangeText={onChangeText}
						value={text}
						placeholder='Search'
						placeholderTextColor='#566379'
						cursorColor='#E7FE55'
					/>
				</View>
				{!text && <View>
					<Text style={styles.searchTitle}>Try to find it...</Text>
					<SearchItem image={WorldSearch} title='Countries' subtitle='Italy, USA, Canada' />
					<SearchItem image={MapPin} title='Cities' subtitle='Buenos Aires, London, Amsterdam' />
					<SearchItem image={Server} title='Servers' subtitle='BR #1, NL #3,  USA #10' />
				</View>}
				{text && <View>
					<ScrollView style={styles.functions}>
						{filteredCountries.length > 0 && (
							<>
								<Text style={styles.subTitle}>Countries</Text>
								{filteredCountries.map((item, index) => (
									<CountryItem
										key={index}
										isFree={false}
										more={true}
										dot={true}
										style={{ color: "#566379" }}
										countryName={<HighlightText text={item.country} highlight={text} />}
										flag={item.img}
										onPress={() => openModal(item)}
									/>
								))}
							</>
						)}

						{filteredCities.length > 0 && (
							<>
								<Text style={styles.subTitle}>Cities</Text>
								{filteredCities.map((item, index) => (
									<CountryItem
										key={index}
										more={true}
										// noFlag={true}
										style={{ color: "#566379" }}
										dot={true}
										isFree={true}
										cityName={<HighlightText text={item.city} highlight={text} />}
										flag={"https://s3.timeweb.cloud/b55ef052-94710705-5eba-493a-91af-683f77214b00/assets/map-pin.svg"}
										width={'24'}
										height={'24'}
										onPress={() => openModal(item)}
									/>
								))}
							</>
						)}

						{filteredServers.length > 0 && (
							<>
								<Text style={styles.subTitle}>Servers</Text>
								{filteredServers.map((item, index) => (
									<TouchableOpacity key={index} onPress={() => selectServer(item)}>
										<CountryItem
											noFlag={true}
											server={true}
											isFree={true}
											cityName={<HighlightText text={item.countryShort + ' #' + item.id} highlight={text} />}
											flag={'https://s3.timeweb.cloud/b55ef052-94710705-5eba-493a-91af-683f77214b00/assets/server.svg'}
											width={'24'}
											height={'24'}
											ping={item.ping}
										/>
									</TouchableOpacity>
								))}
							</>
						)}
					</ScrollView>
				</View>
				}
			</View>
			{/* Модальное окно с CitiesList */}
			<Modal transparent visible={visible} animationType="none">
				<GestureHandlerRootView style={{ flex: 1 }}>
					<View style={styles.modalBackground}>
						<GestureDetector gesture={swipeDown}>
							<Animated.View style={[styles.modal, animatedStyle]}>
								<CitiesList countryName={selcetItemRgion} closeModal={closeModal} isSubscriptionActive />
							</Animated.View>
						</GestureDetector>
					</View>
				</GestureHandlerRootView>
			</Modal>
		</>
	)
}
const styles = StyleSheet.create({
	containerModal: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)", // затемнение фона
		justifyContent: "flex-end", // окно снизу
	},
	modal: {
		height: SCREEN_HEIGHT * 0.4,
		backgroundColor: '#1F1F1F',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 10,
	},
	highlight: {
		color: '#fff',
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		backgroundColor: '#000000',
		padding: 14,
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 24,
	},
	input: {
		flex: 1,
		color: '#fff'
	},
	searchTitle: {
		marginTop: '8%',
		marginBottom: '1%',
		fontFamily: 'Montserrat-600',
		color: '#fff',
		fontSize: 18,
		lineHeight: 22,
		fontWeight: 600,
	},
	functions: {
		flexDirection: 'column',
	},
	subTitle: {
		marginTop: '6%',
		color: '#E7FE55',
		fontFamily: 'Montserrat-600',
		fontSize: 18,
		fontWeight: 600,
		rowGap: 8,
	},
})
export default Search;