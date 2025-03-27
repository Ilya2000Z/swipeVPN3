import React, {useEffect, useMemo, useState} from 'react';
import { Platform, StyleSheet } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, StackNavigationOptions, TransitionPresets, } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
// import  { createAppContainer } from '@react-navigation';
import Home from '../screens/Home/Home.tsx';
import About from '../screens/About.tsx';
import Quiz from '../screens/Quiz.tsx';
import Onboarding from '../screens/Onboarding.tsx'
import MapScreen from "../screens/Home/MapScreeen.tsx";
import {DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Drawer as DrawerPaper} from 'react-native-paper';
import Images from '../assets/Images.ts';
import {Colors} from "../theme/Colors.ts";
import OnboardFinish from '../screens/OnboardFinish.tsx'
import Regions from '../screens/Regions.tsx';
import ConnectionScreen from '../screens/ConnectionScreen.js';
import Search from '../screens/Search.js';
import Subscription from '../screens/Subscription.js';
import { useSelector } from 'react-redux';

type RootDrawerParamList = {
    Home: undefined;
    About: undefined;
    Quiz: undefined;
    OnboardFinish: undefined;
    Onboarding: undefined;
    MapScreen: undefined;
    Regions: undefined;
    ConnectionScreen: undefined;
    Search: undefined;
    Subscription: undefined;
};

const screens = {
    Quiz: {
        screen: Quiz
    },
    Onboarding: {
        screen: Onboarding
    },
    About: {
        screen: About
    }

}

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator();


const CustomDrawerContent = (props) => {
    return (
        <View style={styles.drawerContainer}>
            {/* Контейнер для пунктов меню */}
            <View style={styles.menuContainer}>
            <BlurView 
                style={styles.blurContainer} // Применяем эффект размытия только к области меню
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor=""
                overlayColor="transparent"
                blurRadius={25}
                downsampleFactor={30}
            />
             <BlurView 
                style={styles.blurContainer} // Применяем эффект размытия только к области меню
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor=""
                overlayColor="transparent"
                blurRadius={24}
                downsampleFactor={50}
            />
                 <BlurView 
                style={styles.blurContainer} // Применяем эффект размытия только к области меню
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor=""
                overlayColor="transparent"
                blurRadius={24}
                downsampleFactor={50}
            />
                 <DrawerPaper.Item
                    onPress={() => props.navigation.closeDrawer()}
                    right={() => <Image style={styles.icon} source={Images.cross} />}
                    label={<Text style={styles.label}></Text>}
                />
                <DrawerPaper.Item
                    onPress={() => props.navigation.navigate('Subscription')}
                    right={() => <Image style={styles.icon} source={Images.arrowRight} />}
                    icon={() => <Image style={styles.icon} tintColor="white" source={Images.shield} />}
                    label={<Text style={styles.label}>Subscription</Text>}
                />
                <Divider style={styles.divider} />
                <DrawerPaper.Item
                    onPress={() => props.navigation.navigate('RateUs')}
                    right={() => <Image style={styles.icon} source={Images.externalLink} />}
                    icon={() => <Image tintColor="white" source={Images.star} />}
                    label={<Text style={styles.label}>Rate Us</Text>}
                />
                <Divider style={styles.divider} />
                <DrawerPaper.Item
                    onPress={() => props.navigation.navigate('Help')}
                    right={() => <Image style={styles.icon} source={Images.arrowRight} />}
                    icon={() => <Image tintColor="white" source={Images.help} />}
                    label={<Text style={styles.label}>Help</Text>}
                />
                <Divider style={styles.divider} />
                <DrawerPaper.Item
                    onPress={() => props.navigation.navigate('About')}
                    right={() => <Image style={styles.icon} source={Images.arrowRight} />}
                    icon={() => <Image tintColor="white" source={Images.alertCricle} />}
                    label={<Text style={styles.label}>About Us</Text>}
                />
            
            </View>
        </View>
    );
};

 const HeaderLeft = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View style={{width: 55, height: 55, borderRadius: 25, backgroundColor: Colors.mainColor, alignItems: 'center', justifyContent: 'center', marginStart: 10}}>
                <Image tintColor={Colors.mainBackground} source={Images.drawer} style={{width: 30, height: 30}}/>
            </View>
        </TouchableOpacity>
    );
};

const HeaderRight = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {navigation.navigate('Search')}}>
            <View style={{width: 55, height: 55, borderRadius: 25, backgroundColor: Colors.mainColor, alignItems: 'center', justifyContent: 'center', marginStart: 10}}>
                <Image tintColor={Colors.mainBackground} source={Images.search} style={{width: 30, height: 30}}/>
            </View>
        </TouchableOpacity>
    );
};

const Navigator = () => {
    const userInfo = useSelector(state => state.user);
    const [firstScreen, setFirstScreen] = useState('Onboarding')
    console.log('firstScreen ',firstScreen)
    useEffect(()=> {
        setFirstScreen(!userInfo.onBording ? 'Onboarding' : "MapScreen")
    }, [userInfo.onBording])
    return (
    <NavigationContainer>
        {/*<Stack.Navigator>*/}
        {/*    <Stack.Screen name="Onboarding" component={Onboarding}/>*/}
        {/*</Stack.Navigator>*/}
        <Drawer.Navigator screenOptions={{
            headerLeft: (_) => <HeaderLeft />,
            headerRight: (_) => <HeaderRight />,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.mainBackground,
            },
            drawerStyle: {
                backgroundColor: 'transparent', // Прозрачный фон бокового меню
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} drawerContent={(props) => <CustomDrawerContent {...props} /> } initialRouteName={ !userInfo.onBording ? 'Onboarding' : "MapScreen" } >
            <Drawer.Screen options={{
                headerLeft: () => null, // Скрыть headerLeft
                headerRight: () => null, // Скрыть headerRight
                headerTitle: () => null,
                headerShown: false,
            }} name="Onboarding" component={Onboarding} />
            <Drawer.Screen options={{
                headerLeft: () => null, // Скрыть headerLeft
               
                headerTitle: () => null,
                headerShown: false,
            }} name="OnboardFinish" component={OnboardFinish} />
            {/* <Drawer.Screen options={{
                title: 'SwipeVPN',
                headerRight: () => null, // Скрыть headerRight
            }} name="MapScreen" component={MapScreen}
            /> */}
            <Drawer.Screen
                name="MapScreen"
                component={MapScreen}
                options={({ navigation }) => ({
                    // headerLeft: (_) => <HeaderLeft />,
                    header: (_) => (
                        <View style={styles.customHeader}>
                            {/* Передаем navigation через options */}
                            {/* <HeaderLeft />
                            <Text style={styles.headerTitle}>SwipeVPN</Text>
                            <View style={styles.headerIcon}></View> */}
                        </View>
                    ),
                    headerTransparent: true,
                })}
            />
            <Drawer.Screen
                name="ConnectionScreen"
                component={ConnectionScreen}
                options={{
                    header: () => (
                        <View style={styles.customHeader}>
                            {/* Drawer Icon (Left) */}
                            
                            <HeaderLeft />

                            {/* Title */}
                            <Text style={styles.headerTitle}>SwipeVPN</Text>
                            <View style={styles.headerIcon}></View>
                            {/* Optional Right Icon (Add if needed) */}
                        </View>
                    ),
                    headerTransparent: true, // Ensures the header overlays the ConnectionScreen
                }}
            />
             <Drawer.Screen
                name="Search"
                component={Search}
                options={{
                    headerLeft: () => null, // Скрыть headerLeft
                    headerRight: () => null, // Скрыть headerRight
                    headerTitle: () => null,
                    headerShown: false,
                }}
            />
            <Drawer.Screen options={{
                 headerLeft: () => null, // Скрыть headerLeft
                 headerRight: () => null, // Скрыть headerRight
                 headerTitle: () => null,
                 headerShown: false,
            }} name="Subscription" component={Subscription}
            />
             <Drawer.Screen options={{
                title: 'SwipeVPN',
            }} name="Regions" component={Regions}
            />
            <Drawer.Screen name="About" component={About} />

        </Drawer.Navigator>
    </NavigationContainer>
);
};
const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        width:'90%'
    },
    blurContainer: {
        ...StyleSheet.absoluteFillObject, // Применяем эффект размытия только к области меню
    },
    menuContainer: {
        flex: 1,
        backgroundColor: 'rgba(24, 24, 24, 0.2)', // Полупрозрачный фон для плавного перехода
        paddingVertical: 10,
        paddingHorizontal: 15,
        zIndex:4
    },
    label: {
        color: '#ffffff',
        fontSize: 16,
    },
    icon: {
        width: 20,
        height: 20,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#555',
    },
    customHeader: {
        position: 'absolute',
        top: 15,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        zIndex: 10, // Ensure it stays above the MapScreen
    },
    headerIcon: {
        width: 55, 
        height: 55, 
        borderRadius: 25,
        tintColor: '#fff',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default Navigator;
