import React from 'react';
import {Region} from '../../../Model';
import {Image, SectionList, Text, View} from 'react-native';
import Images from '../../../assets/Images.ts';

interface RegionsProps {
    regions?: Region[]
    plusRegions?: Region[]
}

const Regions: React.FC<RegionsProps> = (props: RegionsProps) => {
    const sectionsRegion: ({ data: Region[]; title: string })[] = [
        {
            title: 'Regions',
            data: props.plusRegions ?? [],
        },
        {
            title: 'Plus Regions',
            data: props.regions ?? [],
        },
    ];
    return (
        <SectionList
            sections={sectionsRegion}
            renderSectionHeader={({ section: { title } }) => (
                <View style={{marginTop: 20, paddingHorizontal: 10}}>
                    <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>{title}</Text>
                </View>
            )}
            renderItem={({ item }) => (
            <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 10, marginTop: 20}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 40, height: 40}} source={item.image}/>
                    <View style={{flexDirection: 'column', marginStart: 10}}>
                        <Text style={{color: 'white'}}>{item.country}</Text>
                        <Text style={{color: 'gray'}}>{item.cities[0].name}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 20, height: 20}} source={Images.arrowRight} />
                </View>
                <View
                    style={{
                        borderWidth: 0.5,
                        borderColor:'gray',
                        marginTop: 10,
                    }}
                />
            </View>
        )}/>
    );
};

export default Regions;
