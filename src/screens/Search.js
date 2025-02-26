import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Platform, StyleSheet, ScrollView } from 'react-native';

import SearchItem from './UI/SearchItem'
import CountryItem from './UI/CountryItem'
import ArrowLeft from '../assets/svg/arrowLeft';
import WorldSearch from '../assets/svg/worldSearch';
import MapPin from '../assets/svg/map-pin';
import Server from '../assets/svg/server';
import { useSelector, useDispatch } from 'react-redux';

// import PL from '../assets/flags/PL.svg'
// import US from '../assets/flags/US.svg'

const Search = () => {
const pay = useSelector(state => state.regionInfo.serverItems.payload.pay);
const [text, onChangeText] = React.useState('');
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
	<View style={styles.container}>
		<View style={styles.search}>
			<ArrowLeft/>
	        <TextInput
	            style={styles.input}
	            onChangeText={onChangeText}
	            value={text}
	            placeholder='Search'
	            placeholderTextColor='#566379'
	            cursorColor='#E7FE55'
	        />
        </View>
        { !text && <View>
            <Text style={styles.searchTitle}>Try to find it...</Text>
	        <SearchItem image={WorldSearch} title='Countries' subtitle='Italy, USA, Canada'/>
	        <SearchItem image={MapPin} title='Cities' subtitle='Buenos Aires, London, Amsterdam'/>
	        <SearchItem image={Server} title='Servers' subtitle='BR #1, NL #3,  USA #10'/>
		</View>}
		{text && <View>
            <ScrollView style={styles.functions}>
			{filteredCountries.length > 0 && (
                        <>
                            <Text style={styles.subTitle}>Countries</Text>
                            {filteredCountries.map((item, index) => (
                                <CountryItem
                                    key={index}
                                    isFree={true}
									more={true}
                                    dot={true}
									style={{color:"#566379"}}
                                    countryName={<HighlightText text={item.country} highlight={text} />}
                                    flag={item.img}
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
									style={{color:"#566379"}}
                                    dot={true}
                                    isFree={true}
                                    cityName={<HighlightText text={item.city} highlight={text} />}
									flag={"https://s3.timeweb.cloud/b55ef052-94710705-5eba-493a-91af-683f77214b00/assets/map-pin.svg"}
									width={'24'}
									height={'24'}
                                />
                            ))}
                        </>
                    )}

                    {filteredServers.length > 0 && (
                        <>
                            <Text style={styles.subTitle}>Servers</Text>
                            {filteredServers.map((item, index) => (
                                <CountryItem
                                    key={index}
                                    noFlag={true}
                                    server={true}
                                    isFree={true}
                                    cityName={<HighlightText text={item.countryShort + ' #' + item.id} highlight={text} /> }
									flag={'https://s3.timeweb.cloud/b55ef052-94710705-5eba-493a-91af-683f77214b00/assets/server.svg'}
									width={'24'}
									height={'24'}
									ping={item.ping}
                                />
                            ))}
                        </>
                    )}
            </ScrollView>
		</View>
		}
	</View>
)
}
const styles = StyleSheet.create({
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