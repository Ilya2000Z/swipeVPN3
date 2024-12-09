import React, {useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import { StyleSheet } from 'react-native';
import SwipeSlider from '../../components/SwipeButton.tsx';
import Regions from './Components/Regions.tsx';
import {Region} from '../../Model';
import Images from '../../assets/Images.ts';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {SelectCity} from '../BottomSheetContent.tsx';
import {Colors} from "../../theme/Colors.ts";

const regions: Region[] = [
    {
        country: 'Poland',
        cities: [
            {
                name: 'Warsaw',
                config: '',
            },
        ],
        server: '',
        image: Images.poland,
    },
    {
        country: 'Netherlands',
        cities: [
            {
                name: 'Amsterdam',
                config: '',
            },
        ],
        server: '',
        image: Images.netherlands,
    },
    {
        country: 'USA',
        cities: [
            {
                name: 'Washington',
                config: '',
            },
        ],
        server: '',
        image: Images.usa,
    },
    {
        country: 'France',
        cities: [
            {
                name: 'Paris',
                config: '',
            },
        ],
        server: '',
        image: Images.france,
    },
];

const plusRegions: Region[] = [
    {
        country: 'Poland',
        cities: [
            {
                name: 'Warsaw',
                config: '',
            },
        ],
        server: '',
        image: Images.poland,
    },
    {
        country: 'Netherlands',
        cities: [
            {
                name: 'Amsterdam',
                config: '',
            },
        ],
        server: '',
        image: Images.netherlands,
    },
    {
        country: 'USA',
        cities: [
            {
                name: 'Washington',
                config: '',
            },
        ],
        server: '',
        image: Images.usa,
    },
    {
        country: 'France',
        cities: [
            {
                name: 'Paris',
                config: '',
            },
        ],
        server: '',
        image: Images.france,
    },
];

const Home = () => {
    const sheetRef = useRef<BottomSheet>(null);
    const [clickedRegion, setClickedRegion] = useState<Region>();

    const onRegionClick = (region: Region) => {
        setClickedRegion(region);
        sheetRef.current?.snapToPosition('40%');
    };

    return (
        <View style={{flex: 1, backgroundColor: Colors.mainBackground}}>
            <Regions regions={regions} plusRegions={plusRegions} onRegionClick={onRegionClick}/>
            <SwipeSlider
                text="Свайп!"
                onCompleteRight={() => Alert.alert('Достигнут конец вправо!')}
                onCompleteLeft={() => Alert.alert('Достигнут конец влево!')}
            />
            <BottomSheet
                handleStyle={{backgroundColor: '#1f1f1f'}}
                handleIndicatorStyle={{backgroundColor: 'gray', width: 50}}
                ref={sheetRef}
                index={-1}
                snapPoints={['40%']}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={{flex: 1, backgroundColor: '#1f1f1f'}}>
                    <SelectCity region={clickedRegion}/>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    // container: {
    //     flex: 1,
    //     position: 'relative',
    //     justifyContent: 'flex-end',
    //     backgroundColor: '#121314',
    //     paddingBottom: 30,
    // },
    buttonMenuWrapper: {
        position: 'absolute',
        top: 32,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Montserrat-600',
        color: '#fff',
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24.38,
        letterSpacing: 0.15000000596046448,
    },
    bottomWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    swipe: {
        marginTop:16,
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
});
export default Home;
