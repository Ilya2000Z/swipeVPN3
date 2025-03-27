import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import SubscriptionOption from './UI/SubscriptionOption';
import ContinueButton from './UI/ContinueButton';
// import { useFonts } from "expo-font";
import BaseButton from './UI/BaseButton.js';
import Check from '../assets/svg/check.js';
import SubscriptionBackground from '../assets/subscription-screen.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubscription } from '../store/modules/subscription';
import { TRIAL_DATE } from '../store/modules/subscription';
import { TouchableOpacity } from 'react-native';

const Subscription = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    const [select, setSelect] = useState(null);
    const dispatch = useDispatch();

    const selectHendler = (type) => {
        setSelect(type);
    };

    const continueNext = () => {
        let date = new Date();
        if (select === 'trial') {
            date.setDate(date.getDate() + TRIAL_DATE);
            dispatch(updateSubscription({
                subscriptionType: 'trial',
                subcriptionExpiredAt: date.toISOString(),
                isExpired: false,
                isPaid: false,
            }));
        } else if (select === 'mounth') {
            date.setDate(date.getDate() + 30);
            dispatch(updateSubscription({
                subscriptionType: 'mounth',
                subcriptionExpiredAt: date.toISOString(),
                isExpired: false,
                isPaid: true,
            }));
        }
        if (select === 'year') {
            date.setDate(date.getFullYear() + 1);
            dispatch(updateSubscription({
                subscriptionType: 'yard',
                subcriptionExpiredAt: date.toISOString(),
                isExpired: false,
                isPaid: true,
            }));
        }
        console.log('navigate to MapScreen');
        navigation.navigate('MapScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <ImageBackground style={[styles.background, { width, height }]}  resizeMode="cover" source={SubscriptionBackground} />
            </TouchableOpacity>
               
            <ScrollView style={styles.wrapper}>
                <BaseButton style={styles.exit} theme='exit' />
                <View style={styles.block}>
                    <Text style={styles.title}>Freedom is at your fingertips</Text>
                    <View style={styles.listWrapper}>
                        <View style={styles.listItemWrapper}>
                            <View style={styles.icon}>
                                <Check style={styles.checkmark} />
                            </View>
                            <Text style={styles.listText}>No logging policy</Text>
                        </View>
                        <View style={styles.listItemWrapper}>
                            <View style={styles.icon}>
                                <Check style={styles.checkmark} />
                            </View>
                            <Text style={styles.listText}>Access to +100 regions</Text>
                        </View>
                        <View style={styles.listItemWrapper}>
                            <View style={styles.icon}>
                                <Check style={styles.checkmark} />
                            </View>
                            <Text style={styles.listText}>High speed</Text>
                        </View>
                        <View style={styles.listItemWrapper}>
                            <View style={styles.icon}>
                                <Check style={styles.checkmark} />
                            </View>
                            <Text style={styles.listText}>No ads, no restrictions</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.subscriptionItems}>
                    <SubscriptionOption
                        title='Trial period'
                        subtitle={`${TRIAL_DATE} days`}
                        onPress={() => selectHendler('trial')}
                        isActive={select === 'trial'}
                    />
                    <SubscriptionOption
                        title='1 month'
                        sideText='Popular'
                        subtitle='4$'
                        duration='/month'
                        popular={true}
                        onPress={() => selectHendler("mounth")} isActive={select === "mounth"}
                    />
                    <SubscriptionOption
                        title='1 year'
                        subtitle='48$'
                        duration='/year'
                        discount='-20%'
                        onPress={() => selectHendler('year')} isActive={select === 'year'}
                    />
                </View>
                <ContinueButton text='Change plan' onPress={() => continueNext()} isActive={Boolean(select)} />
                <Text style={styles.subscriptionTextBottom}>Auto-renewing subscriptions can be cancelled at any time in the Play Store or app settings</Text>
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        //    marginTop: 24,
        padding: 16,
        flexDirection: 'column',
    },
    wrapper: {
        flex: 1,
        width: '100%',
        maxHeight: '100%',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        transform: [
            { translateX: 0 },
            { translateY: 0 },
            { rotate: '0deg' },
        ],
    },
    exit: {
        margin: 0,
    },
    block: {
        marginTop: '3%',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10.199999809265137px)',
        borderWidth: 1,
        borderColor: '#FFFFFF17',
    },
    title: {
        color: '#fff',
        fontFamily: 'Montserrat-700',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 28.01,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textDecorationColor: '#fff',
        textUnderlineOffset: 'auto',
    },
    icon: {
        width: 20,
        height: 20,
        backgroundColor: '#E7FE55',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subscriptionItems: {
        flex: 1,
        rowGap: 5,
        justifyContent: 'center',
        marginBottom: '4%',
    },
    listItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        marginTop: '5%',
    },
    listText: {
        flex: 1,
        color: '#fff',
        fontFamily: 'Montserrat-500',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 17.07,
        textAlign: 'left',
        textDecorationLine: 'none',
        textDecorationStyle: 'solid',
        textDecorationColor: 'transparent',
    },
    subscriptionTextBottom: {
        color: '#566379',
        textAlign: 'center',
        marginTop: '3%',
    },
});
export default Subscription;
