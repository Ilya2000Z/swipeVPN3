import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, Image } from 'react-native';
import Images from '../assets/Images.ts';
import Chevrons from '../assets/svg/chevrons.js';

interface SwipeSliderProps {
    onCompleteRight?: () => void; // Действие при достижении конца вправо
    onCompleteLeft?: () => void; // Действие при достижении конца влево
    text?: string; // Текст внутри ползунка
    status: boolean;
    isCountry: Boolean;
}

const SwipeSlider: React.FC<SwipeSliderProps> = ({
        onCompleteRight,
        onCompleteLeft,
        text = 'Свайпните',
        status,
        isCountry
    }) => {
    const disabled = !Boolean(Object.keys(useSelector(state => state.regionInfo.vpnItem)).length);    
    const screenWidth = Dimensions.get('window').width; // Получаем ширину экрана
    const containerPadding = 20; // Отступ по горизонтали
    const sliderWidth = screenWidth - containerPadding * 2; // Ширина контейнера
    const sliderSize = 90; // Ширина ползунка
    const sliderHeight = 70; // Высота ползунка
    const borderRadius = 50; // Скругление ползунка

    const [sliderPosition] = useState(new Animated.Value(0)); // Положение ползунка
    const [startPosition, setStartPosition] = useState(0); // Начальная точка

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dx) > 5 && !disabled, // Начинаем только при горизонтальном движении

        onPanResponderGrant: () => {
            // Сохраняем текущую позицию ползунка при начале свайпа
            if(disabled || !isCountry) return;
            sliderPosition.stopAnimation((value) => {
                setStartPosition(value);
            });
        },

        onPanResponderMove: (_, gestureState) => {
            if(disabled || !isCountry) return;
            // Двигаем ползунок относительно начальной позиции
            const newPosition = startPosition + gestureState.dx;

            // Ограничиваем движение в пределах контейнера
            sliderPosition.setValue(
                Math.max(0, Math.min(sliderWidth - sliderSize, newPosition))
            );
        },

        onPanResponderRelease: (_, gestureState) => {
            if(disabled || !isCountry) return;

            const threshold = sliderWidth - sliderSize - 10; // Порог для завершения свайпа

            if (gestureState.dx + startPosition >= threshold && onCompleteRight) {
                // Свайп вправо до конца
                Animated.spring(sliderPosition, {
                    toValue: sliderWidth - sliderSize, // Устанавливаем крайнее правое положение
                    useNativeDriver: true,
                }).start(() => {
                    onCompleteRight();
                    setStartPosition(sliderWidth - sliderSize); // Обновляем начальную позицию
                });
            } else if (gestureState.dx + startPosition <= 10 && onCompleteLeft) {
                // Свайп влево до конца
                Animated.spring(sliderPosition, {
                    toValue: 0, // Устанавливаем крайнее левое положение
                    useNativeDriver: true,
                }).start(() => {
                    onCompleteLeft();
                    setStartPosition(0); // Обновляем начальную позицию
                });
            } else {
                Animated.spring(sliderPosition, {
                    toValue: onCompleteRight ? sliderWidth - sliderSize : 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });


    return (
        <View style={[styles.container, { width: sliderWidth }, (disabled || !isCountry) ? styles.disconect : null]}>
            <Text style={[!status || !isCountry ? styles.activeText : styles.disabledText, {alignSelf:'center'}]}>{!status ? 'Connect': 'Disconnect'}</Text>
            <Animated.View
                style={[
                    styles.slider,
                    {
                        width: sliderSize,
                        height: sliderHeight,
                        borderRadius: borderRadius,
                        transform: [{ translateX: sliderPosition }],
                    },
                ]}
                {...panResponder.panHandlers}
            >
                <Image source={Images.dots}/>
            </Animated.View>  
            { !disabled && isCountry ? (
                <>
            <Animated.View
                style={[
                    styles.chevron,
                    {
                        left: !status ? 'auto' : 20, // Слева, если status === false
                        right: !status ? 20 : 'auto', // Справа, если status === true
                        transform: [{ scaleX: !status ? 1 : -1 }], // Разворот, если status === false
                    },
                ]}
            >
                <Chevrons />   
            </Animated.View>
            </>
                ): <View></View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    disconect: {
        opacity: 0.3
    },
    chevron: {
        position: 'absolute',
        top: '40%',
        transform: [{ translateY: -6 }], // Центрирование по вертикали
    },
    container: {
        // marginTop: 10,
        height: 70, // Высота контейнера совпадает с высотой ползунка
        borderColor: '#1C1F20',
        borderRadius: 50,
        justifyContent: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
        position: 'relative',
        // backdropFilter: 'blur(4.800000190734863px)',
    },
    slider: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    track: {
        height: 74,
        backdropFilter: 'blur(4.800000190734863px)',
        borderWidth: 1,
        borderColor: '#1C1F20',
        borderStyle: 'stroke',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 4,
        paddingRight: 24,
        borderRadius: 190,
    },
    disabledText: {
        color: '#DD2033',
    },
    activeText: {
        color: '#fff',
    },
    disabled: {
        backgroundColor: '#3A3A3A',
    },
});

export default SwipeSlider;
