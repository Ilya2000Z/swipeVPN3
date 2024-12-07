import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home/Home.tsx';
import About from '../screens/About.tsx';
import {DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Divider, Drawer as DrawerPaper} from 'react-native-paper';
import Images from '../assets/Images.ts';

type RootDrawerParamList = {
    Home: undefined;
    About: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const CustomDrawerContent = (props) => {
    return (
        <View style={{flex: 1, backgroundColor: 'black', paddingVertical: 10}}>
            <DrawerPaper.Item onPress={() => props.navigation.navigate('Home')} right={() => <Image style={{width: 20, height: 20}} source={Images.arrowRight} />} icon={() => <Image tintColor={'white'} source={Images.shield}/>} label={<Text style={{color: '#ffffff'}}>Subscription</Text>}/>
            <Divider style={{marginTop: 10}}/>
            <DrawerPaper.Item style={{marginTop: 10}} icon={() => <Image tintColor={'white'} source={Images.aboutUs}/>} right={() => <Image style={{width: 20, height: 20}} source={Images.arrowRight} />}  label={<Text style={{color: '#ffffff'}}>About us</Text>} onPress={() => props.navigation.navigate('About')} />
            <Divider style={{marginTop: 10}}/>
        </View>
    );
};

const HeaderLeft = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View style={{width: 55, height: 55, borderRadius: 25, backgroundColor: '#E7FE55', alignItems: 'center', justifyContent: 'center', marginStart: 10}}>
                <Image tintColor={'black'} source={Images.drawer} style={{width: 30, height: 30}}/>
            </View>
        </TouchableOpacity>
    );
};

const HeaderRight = () => {
    return (
        <TouchableOpacity onPress={() => {}}>
            <View style={{width: 55, height: 55, borderRadius: 25, backgroundColor: '#E7FE55', alignItems: 'center', justifyContent: 'center', marginStart: 10}}>
                <Image tintColor={'black'} source={Images.search} style={{width: 30, height: 30}}/>
            </View>
        </TouchableOpacity>
    );
};

const Navigator = () => {
    return (
    <NavigationContainer>
        <Drawer.Navigator screenOptions={{
            headerLeft: (_) => <HeaderLeft />,
            headerRight: (_) => <HeaderRight />,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} drawerContent={(props) => <CustomDrawerContent {...props} /> } initialRouteName={'Home'} >
            <Drawer.Screen options={{
                title: 'SwipeVPN',
            }} name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    </NavigationContainer>
);
};

export default Navigator;
