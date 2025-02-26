import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapSvg from '../../assets/svg/map'; // Импорт карты как компонента
import Svg, { Circle } from 'react-native-svg';

const MapContainer = ({ latitude, longitude }) => {
    // Преобразование координат в SVG
    const transformCoordinates = (lat, lon) => {
        const x = lon; // Долгота
        const y = -lat; // Инверсия широты
        return { x, y };
    };

    // Координаты города
    const { x, y } = transformCoordinates(latitude, longitude);

    return (
        <View style={styles.container}>
            <MapSvg width="100%" height="100%" />
            <Svg viewBox="-180 -90 360 180" style={StyleSheet.absoluteFill}>
                <Circle cx={x} cy={y} r="14" fill="red" />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapContainer;
