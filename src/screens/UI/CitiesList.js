import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useFonts } from "expo-font";

import More from '../../assets/svg/more';
import MapPin from '../../assets/svg/map-pin';
import SvgComponent from './GetSvg';
import Ping from '../../assets/svg/ping';
import ArrowLeft from '../../assets/svg/arrowLeft';
import { useDispatch, useSelector } from 'react-redux';
import { setVpnItem } from '../../store/serverinfo';
import { useNavigation } from '@react-navigation/native';

const CitiesList = (props) => {
  const regionInfo = useSelector(state => state.regionInfo);
  const dispatch = useDispatch();
  const navigate = useNavigation()
  // const [fontsLoaded] = useFonts({
  // "Montserrat-700": require("../../assets/fonts/Montserrat-Bold.ttf"),
  //  "Montserrat-500": require("../../assets/fonts/Montserrat-Medium.ttf"),
  // "Montserrat-600": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  // });
  const [selectcity, setSelectCity] = useState()
  const selectCityHandler = (item) => {
    if (item) {
      setSelectCity({ server: item.servers, cityName: item.city })
    } else {
      setSelectCity(item)
    }

  }
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
    if (!props.isSubscriptionActive) {
      navigate.navigate("Subscription")
      return;
    }
    dispatch(setVpnItem(findAndConvertVPN(regionInfo.serverItems.payload, itemServer)));
    props.closeModal();
    navigate.navigate('MapScreen');
  };
  const renderServerItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => selectServer(item)}>
        <View style={styles.cityWrapper}>
          <Text style={[styles.serverCount, !props.isSubscriptionActive && styles.opacity]}>{item.country_short} #{item.id}</Text>
          <Ping />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cityWrapper}>
      <MapPin />
      <Text style={[styles.cityName, !props.isSubscriptionActive && styles.opacity]}>{item.city}</Text>
      <TouchableOpacity onPress={() => selectCityHandler(item)}>
        <More style={styles.more} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text style={styles.grabber}></Text>
      <View style={styles.countryWrapper}>
        {selectcity &&
          <TouchableOpacity onPress={() => selectCityHandler(null)}>
            <ArrowLeft />
          </TouchableOpacity>
        }
        <SvgComponent url={props.countryName.img} />
        {!selectcity ? (
          <Text style={styles.countryName}>{props.countryName.country}</Text>
        ) :
          <View>
            <Text style={styles.countryName}>{props.countryName.country}</Text>
            <Text style={styles.citiesCount}>{selectcity.cityName}</Text>
          </View>
        }
      </View>
      {!selectcity ? (
        <Text style={styles.citiesCount}>{props.countryName.cityItem?.length} cities</Text>
      ) :
        <View style={styles.serversInfo}>
          <Text style={styles.citiesCount}>{selectcity.server?.length} servers</Text>
          <Text style={styles.citiesCount}>Ping</Text>
        </View>
      }

      {!selectcity ? (
        <FlatList
          style={styles.list}
          data={props.countryName.cityItem}
          renderItem={renderItem}
        />) :
        <FlatList
          style={styles.list}
          data={selectcity.server}
          renderItem={renderServerItem}
        />
      }


    </View>
  )
}

const styles = StyleSheet.create({
  serverCount: {
    marginLeft: 5,
    flex: 1,
    color: '#fff',
    fontFamily: 'Montserrat-400',
    fontSize: 16,
    fontWeight: 400,
  },
  serversInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Чтобы элементы выровнялись по вертикали
    width: "100%", // Чтобы занять всю ширину
    paddingRight: 30
  },
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  wrapper: {
    width: '100%',
    height: 308,
    zIndex: 1000,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    position: 'absolute',
    bottom: 0,
  },
  grabber: {
    width: 52,
    height: 4,
    backgroundColor: '#566379',
    borderRadius: 30,
    alignSelf: 'center', // Центрируем
    marginVertical: 10,  // Убираем margin и делаем равные отступы сверху и снизу
  },
  countryWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 16,
    paddingTop: '3%',
    paddingBottom: '6%',
  },
  opacity: {
    opacity: 0.6,
  },
  countryName: {
    fontFamily: 'Montserrat-700',
    fontSize: 28,
    fontWeight: 700,
    color: '#fff'
  },
  citiesCount: {
    width: '100%',
    color: '#566379',
    fontFamily: 'Montserrat-400',
    fontSize: 16,
    fontWeight: 400,
  },
  list: {
    width: '100%',
  },
  cityWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 24,
  },
  cityName: {
    marginLeft: 12,
    flex: 1,
    color: '#fff',
    fontFamily: 'Montserrat-400',
    fontSize: 16,
    fontWeight: 400,
  },
})

export default CitiesList;