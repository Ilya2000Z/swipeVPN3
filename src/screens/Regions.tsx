import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Dimensions } from 'react-native';
import { PanGestureHandler, GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from '../store/store.js';
import AdditionalRegions from './UI/AdditionalRegions';
import CountryItem from './UI/CountryItem.js';
import CitiesList from './UI/CitiesList.js';
import { ResponseIP } from '../entitys/server-item.js';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { setVpnItem } from '../store/serverinfo.js';
import SpeedDownloadUpload from './UI/SpeedDownloadUpload.js';
import CurrentLocationTimer from './UI/CurrentLocationTimer.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Regions = ({ navigation }) => {
    const state = store.getState();
    const regionItem = state.regionInfo.serverItems.payload as ResponseIP
    const regionInfo = state.regionInfo
    const [visible, setVisible] = useState(false);
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const dispatch = useDispatch();
    const [serverItemsFree, setServerItemsFree] = useState([]);
    const [serverItemsPay, setServerItemsPay] = useState([]);
    const [selcetItemRgion, setSelectItemRegion] = useState()
    const openModal = (item: any) => {
      setSelectItemRegion(item)
      runOnJS(setVisible)(true);
      translateY.value = withTiming(0); // Открыть модальное окно с анимацией
    };
    const currentConnection = useSelector(state => state.regionInfo.connectState);
    // useEffect(()=> {
    //   setCurrent(regionInfo.connectState)
    //   console.log('curr', currentConnection)
    //   return () => {
    //     setCurrent(regionInfo.connectState)
    //   }
    // }, [regionInfo.connectState])

    const selectVpn = (id: number) => {
      const vpnItem = regionItem.isFree.find((item) => item.id === id)
      dispatch(setVpnItem(vpnItem))
      const state = store.getState();
      console.log(state.regionInfo.vpnItem.ip)
      navigation.navigate('MapScreen')
    }
    useEffect(() => {
      const freeItems = regionItem.isFree.map((item) => (
        <CountryItem
          key={item.id}
          isFree={true}
          countryName={item.country}
          cityName={item.city}
          flag={item.img}
          onPress={() => selectVpn(item.id)} // Передаём функцию-обработчик
        />
      ));
      setServerItemsFree(freeItems);
    
      const payItems = regionItem.pay.map((item, index) => (
        <CountryItem
          key={index}
          isFree={false}
          countryName={item.country}
          cityName={`${item.cityItem.length} city`}
          flag={item.img}
          onPress={() => openModal(item)} // Передаём функцию-обработчик
        />
      ));
      setServerItemsPay(payItems);
    }, [regionItem]);  
    const closeModal = () => {
      translateY.value = withTiming(SCREEN_HEIGHT, {}, () => {
        runOnJS(setVisible)(false); // Закрыть модальное окно
      });
    };
    // Улучшенный свайп вниз
    const swipeDown =  Gesture.Pan()
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
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <AdditionalRegions style={styles.additionalRegions}/>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.blockTitle}>Regions</Text>
            {serverItemsFree}
           

            <Text style={styles.blockTitle}>Plus Regions</Text>
            {serverItemsPay}
          </ScrollView>
          { currentConnection ? (
            <>
              <View  style={styles.currentConnection}>
                <CurrentLocationTimer countryName={regionInfo.vpnItem.country} cityName={regionInfo.vpnItem.city} img={regionInfo.vpnItem.img}/>
                <SpeedDownloadUpload/>
              </View>
            </>
          ): null}
        </View>
      </View>

      {/* Модальное окно с CitiesList */}
      <Modal transparent visible={visible} animationType="none">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.modalBackground}>
            <GestureDetector gesture={swipeDown}>
              <Animated.View style={[styles.modal, animatedStyle]}>
                <CitiesList countryName={selcetItemRgion} closeModal={closeModal}/>
              </Animated.View>
            </GestureDetector>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: SCREEN_HEIGHT* 0.4,
    backgroundColor: '#1F1F1F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  wrapper: {
    flex: 1,
    padding: 16,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%'
  },
  blockTitle: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 40,
    color: '#fff',
    marginBottom: '4%',
    marginTop: '10%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // затемнение фона
    justifyContent: "flex-end", // окно снизу
  },
  modalContent: {
    backgroundColor: '#1F1F1F',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 300, // Высота окна
  },
  currentConnection: {
    position: 'absolute',
    bottom:'5%',
    padding: 16,
    borderRadius: 12,
	  flexDirection: 'column',
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'space-between',
    rowGap: 24,
  },
});

export default Regions;
