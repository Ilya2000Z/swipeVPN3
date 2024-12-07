import React from 'react';
import {FlatList, Image, Text, View} from "react-native";
import {Region} from "../Model";
import Images from "../assets/Images.ts";

interface SelectCityProps {
    region?: Region;
}

export const SelectCity: React.FC<SelectCityProps> = (props) => {
   return (
       <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{width: 40, height: 40}} source={props.region?.image}/>
                <View style={{flexDirection: 'column', marginStart: 10}}>
                    <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>{props.region?.country}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'gray', marginTop: 10}}>{props.region?.cities.length} cities</Text>
            </View>
           <FlatList data={props.region?.cities} renderItem={({item}) => (
               <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                   <Image style={{width: 20, height: 20}} source={Images.mapPin}/>
                   <Text style={{marginStart: 10, color: 'gray'}}>{item.name}</Text>
                   <View style={{flex: 1}}/>
                   <Image style={{width: 20, height: 20}} source={Images.more}/>
               </View>
           )} />
    </View>
   )
}
