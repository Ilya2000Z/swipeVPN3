import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, Image } from 'react-native';
import Images from '../assets/Images.ts';

interface SwipeSliderProps {
    onCompleteRight?: () => void; // Действие при достижении конца вправо
    onCompleteLeft?: () => void; // Действие при достижении конца влево
    text?: string; // Текст внутри ползунка
}

const SwipeSlider: React.FC<SwipeSliderProps> = ({
                                                     onCompleteRight,
                                                     onCompleteLeft,
                                                     text = 'Свайпните',
                                                 }) => {
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
            Math.abs(gestureState.dx) > 5, // Начинаем только при горизонтальном движении

        onPanResponderGrant: () => {
            // Сохраняем текущую позицию ползунка при начале свайпа
            sliderPosition.stopAnimation((value) => {
                setStartPosition(value);
            });
        },

        onPanResponderMove: (_, gestureState) => {
            // Двигаем ползунок относительно начальной позиции
            const newPosition = startPosition + gestureState.dx;

            // Ограничиваем движение в пределах контейнера
            sliderPosition.setValue(
                Math.max(0, Math.min(sliderWidth - sliderSize, newPosition))
            );
        },

        onPanResponderRelease: (_, gestureState) => {
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
        <View style={[styles.container, { width: sliderWidth }]}>
            <Text style={{alignSelf:'center', color: 'black'}}>Test</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 70, // Высота контейнера совпадает с высотой ползунка
        backgroundColor: 'gray',
        borderRadius: 50,
        justifyContent: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
        position: 'relative',
    },
    slider: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
});

export default SwipeSlider;
