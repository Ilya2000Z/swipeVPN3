import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import WorldSvg from '../assets/svg/world';
import {Colors} from "../theme/Colors.ts";
import {useNavigation} from '@react-navigation/native';
import OnboardFinish from "./OnboardFinish.tsx"
import { useSelector } from 'react-redux';

interface Question {
    question: string;
    answers: string[];
    OnboardFinish: undefined;
}

const questions: Question[] = [
    {
        question: 'What will you use a VPN for?',
        answers: [
            'Watching a video',
            'Social network',
            'Watching a video',
            'Watching a video',
        ],
    },
    {
        question: 'Set up a VPN for yourself',
        answers: [
            'Fast VPN servers',
            'Secure internet connection',
            'Secure internet connection',
            'Prevent data theft',
        ],
    },
    {
        question: 'Get all the benefits of using a VPN',
        answers: [
            'Watch streaming content',
            'Play online games',
            'Surf the Internet without restrictions',
            'Secure Wi-Fi',
        ],
    },
];

const Onboarding = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [checked, setChecked] = React.useState<undefined | string>(undefined);
    const currentQuestion = questions[currentStep];
    const progress = (currentStep + 1) / questions.length;
    const userInfo = useSelector(state => state.user);

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setChecked(undefined);
        } else {
            navigation.navigate('OnboardFinish');
            console.log('Онбординг завершен!');
        }
    };
    useEffect(()=> {

        // const [firstScreen, setFirstScreen] = useState('Onboarding')
        // const navigation = useNavigation()
        // console.log('firstScreen ',firstScreen)
        // navigation.navigate(!userInfo.onBording ? 'Onboarding' : "MapScreen")
        // setFirstScreen(!userInfo.onBording ? 'Onboarding' : "MapScreen")
    }, [userInfo.onBording])

    return (
        <View style={styles.container}>
            <Progress.Bar
                width={400}
                borderColor={'gray'}
                color={Colors.mainColor}
                style={styles.progress}
                progress={progress}
            />
            <Text style={styles.questionText} numberOfLines={2}>{currentQuestion.question}</Text>
            <FlatList
                style={{width:'100%', paddingStart: 20, paddingEnd: 20, marginTop: 200}}
                data={currentQuestion.answers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={1} onPress={() => setChecked(index.toString())}>
                        <View style={{width: 'auto', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'gray', marginTop: 10, borderRadius: 6, paddingHorizontal: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <WorldSvg />
                                <Text style={{color: 'white', marginStart: 5}}>{item}</Text>
                            </View>
                            <RadioButton borderColor={Colors.mainColor} containerStyle={{borderRadius: 12, backgroundColor: '#E7FE55'}} borderSize={1} id={index.toString()} onPress={setChecked} selected={index.toString() === checked}/>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={{width: '100%', flex: 1, paddingStart: 20, paddingEnd: 20}} onPress={handleNext} disabled={checked === undefined}>
                <View style={{width: '100%', height: 50, marginBottom: 100, borderRadius: 18, backgroundColor: checked === undefined ? 'gray' : Colors.mainColor, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: Colors.mainBackground, fontSize: 25}}>Continue</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
        paddingVertical: 10,
    },
    progress: {
        marginTop: 16,
        backgroundColor: 'gray',
        height: 5,
    },
    questionText: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#FFF',
    },
    answerButton: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    selectedAnswerButton: {
        borderColor: '#6200ee',
        backgroundColor: '#e0dbf8',
    },
    answerText: {
        fontSize: 16,
        color: '#333',
    },
    selectedAnswerText: {
        color: '#6200ee',
        fontWeight: 'bold',
    },
});

export default Onboarding;
