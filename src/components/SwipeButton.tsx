import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, Image } from 'react-native';
import Images from '../assets/Images.ts';
import Chevrons from '../assets/svg/chevrons.js';

interface SwipeSliderProps {
    onCompleteRight?: () => Promise<void>;
    onCompleteLeft?: () => Promise<void>;
    text?: string;
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
    const screenWidth = Dimensions.get('window').width;
    const containerPadding = 10;
    const sliderWidth = screenWidth - containerPadding * 2;
    const sliderSize = 90;
    const sliderHeight = 70;
    const borderRadius = 50;

    const [sliderPosition] = useState(new Animated.Value(0));
    const [startPosition, setStartPosition] = useState(0);
    const [sideSlider, setSideSlider] = useState(true);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dx) > 5 && !disabled,

        onPanResponderGrant: () => {
            if(disabled || !isCountry) return;
            sliderPosition.stopAnimation((value) => {
                setStartPosition(value);
            });
        },

        onPanResponderMove: (_, gestureState) => {
            if (disabled || !isCountry) return;
            let newPosition = startPosition + gestureState.dx;
            newPosition = Math.max(0, Math.min(sliderWidth - sliderSize, newPosition));
            sliderPosition.setValue(newPosition);
            setStartPosition(newPosition);
        },

        onPanResponderRelease: (_, gestureState) => {
            if (disabled || !isCountry) return;

            const threshold = sliderWidth - sliderSize - 10;

            if (gestureState.dx + startPosition >= threshold && onCompleteRight && sideSlider) {
                setSideSlider(false);
                Animated.spring(sliderPosition, {
                    toValue: sliderWidth - sliderSize,
                    useNativeDriver: true,
                }).start(async () => {
                    setStartPosition(sliderWidth - sliderSize);
                    try {
                        await onCompleteRight();
                    } catch (error) {
                        console.error('Ошибка в onCompleteRight:', error);
                    }
                });

            } else if (gestureState.dx + startPosition <= 10 && onCompleteLeft && !sideSlider) {
                setSideSlider(true);
                Animated.spring(sliderPosition, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start(async () => {
                    setStartPosition(0);
                    try {
                        await onCompleteLeft();
                    } catch (error) {
                        console.error('Ошибка в onCompleteLeft:', error);
                    }
                });

            } else {
                Animated.spring(sliderPosition, {
                    toValue: sideSlider ? 0 : sliderWidth - sliderSize,
                    useNativeDriver: true,
                }).start();
            }
        }
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
                <Image source={Images.dotsSwipe}/>
            </Animated.View>
            { !disabled && isCountry ? (
                <>
                    <Animated.View
                        style={[
                            styles.chevron,
                            {
                                left: status ? 20 : 'auto',
                                right: status ? 'auto' : 20,
                                transform: [{ rotate: status ? '180deg' : '0deg' }],
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
        transform: [{ translateY: -6 }],
    },
    container: {
        height: 70,
        borderColor: '#1C1F20',
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
