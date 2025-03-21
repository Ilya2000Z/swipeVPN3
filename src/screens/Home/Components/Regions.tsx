import React from 'react';
import { Region } from '../../../Model';
import { FlatList, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import Images from '../../../assets/Images.ts';

interface RegionsProps {
    regions?: Region[]
    plusRegions?: Region[]
    onRegionClick: (region: Region) => void,
    isSubscriptionActive?: boolean
}

const Regions: React.FC<RegionsProps> = (props: RegionsProps) => {
    const hasSubscription = props.isSubscriptionActive;

    const allRegions = hasSubscription ? [...props.regions ?? [], ...props.plusRegions ?? []] : null;

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
    return hasSubscription ? (
        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Regions</Text>

            <FlatList data={allRegions} renderItem={({ item }) => (
                <View
                    style={styles.itemContainer}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 40, height: 40 }} source={item.image} />
                        <View style={{ flexDirection: 'column', marginStart: 10 }}>
                            <Text style={{ color: 'white' }}>{item.country}</Text>
                            <Text style={{ color: 'gray' }}>{item.cities[0].name}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Image style={{ width: 20, height: 20 }} source={Images.arrowRight} />
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: 'gray',
                            marginTop: 10,
                        }}
                    />
                </View>
            )} />
        </View>
    ) : (
        <SectionList
            sections={sectionsRegion}
            renderSectionHeader={({ section: { title } }) => (
                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{title}</Text>
                </View>
            )}
            renderItem={({ item, section }) => (
                <View
                    style={[
                        styles.itemContainer,
                        section.title === 'Plus Regions' && !hasSubscription && styles.disabledItem,
                    ]}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 40, height: 40 }} source={item.image} />
                        <View style={{ flexDirection: 'column', marginStart: 10 }}>
                            <Text style={{ color: 'white' }}>{item.country}</Text>
                            <Text style={{ color: 'gray' }}>{item.cities[0].name}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <Pressable onPress={() => props.onRegionClick(item)}>
                            <Image tintColor={'white'} style={{ width: 20, height: 20 }} source={section.title === 'Plus Regions' ? Images.more : Images.arrowRight} />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: 'gray',
                            marginTop: 10,
                        }}
                    />
                </View>
            )} />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 20
    },
    disabledItem: {
        opacity: 0.6,
    },
})

export default Regions;
