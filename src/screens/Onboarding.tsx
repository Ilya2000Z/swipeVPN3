import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import WorldSvg from '../assets/svg/world';
import Compass from '../assets/svg/onboarding/Compass';
import Files from '../assets/svg/onboarding/Files';
import Games from '../assets/svg/onboarding/Games';
import Light from '../assets/svg/onboarding/Light';
import Map from '../assets/svg/onboarding/Map';
import Porno from '../assets/svg/onboarding/Porno';
import Rocket from '../assets/svg/onboarding/Rocket';
import Social from '../assets/svg/onboarding/Social';
import Time from '../assets/svg/onboarding/Time';
import Video from '../assets/svg/onboarding/Video';
import Wifi from '../assets/svg/onboarding/Wifi';
import Wireless from '../assets/svg/onboarding/Wireless';
import { Colors } from "../theme/Colors.ts";
import { useNavigation } from '@react-navigation/native';
import OnboardFinish from "./OnboardFinish.tsx"
import { useSelector } from 'react-redux';

type Answers = {
    name: string,
    icon: string,
}
interface Question {
    question: string,
    answers: Answers[];
    OnboardFinish?: undefined;
}

const GetSvg = (name: string) => {
    switch (name) {
        case 'world':
            return <WorldSvg />
        case 'Wireless':
            return <Wireless />
        case 'Compass':
            return <Compass />
        case 'Files':
            return <Files />
        case 'Games':
            return <Games />
        case 'Light':
            return <Light />
        case 'Map':
            return <Map />
        case 'Porno':
            return <Porno />
        case 'Rocket':
            return <Rocket />
        case 'Social':
            return <Social />
        case 'Time':
            return <Time />
        case 'Video':
            return <Video />
        case 'Wifi':
            return <Wifi />
        case 'Wireless':
            return <Wireless />
        default:
            return <WorldSvg />
    }
}

const questions: Question[] = [
    {
        question: 'What will you use a VPN for?',
        answers: [
            {
                name: 'Watching a video',
                icon: 'Video'
            },
            {
                name: 'Social network',
                icon: "Social",
            },
            {
                name: 'Watching a video',
                icon: "Porno"
            },
            {
                name: 'Watching a video',
                icon: "Rocket"
            }
        ],
    },
    {
        question: 'Set up a VPN for yourself',
        answers: [
            {
                name: 'Fast VPN servers',
                icon: 'Light'
            },
            {
                name: 'Secure internet connection',
                icon: "Map",
            },
            {
                name: 'Secure internet connection',
                icon: "Time"
            },
            {
                name: 'Prevent data theft',
                icon: "Files"
            }
        ],
    },
    {
        question: 'Get all the benefits of using a VPN',
        answers: [
            {
                name: 'Watch streaming content',
                icon: 'Wireless'
            },
            {
                name: 'Play online games',
                icon: "Games",
            },
            {
                name: 'Surf the Internet without restrictions',
                icon: "Compass"
            },
            {
                name: 'Secure Wi-Fi',
                icon: "Wifi"
            }
        ],
    },
];

const Onboarding = ({ navigation }: any) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [checked, setChecked] = React.useState<undefined | string>(undefined);
    const currentQuestion = questions[currentStep];
    const progress = (currentStep + 1) / questions.length;
    const userInfo = useSelector((state: any) => state.user);

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setChecked(undefined);
        } else {
            navigation.navigate('OnboardFinish');
            console.log('Онбординг завершен!');
        }
    };
    useEffect(() => {

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
                style={{ width: '100%', paddingStart: 20, paddingEnd: 20, marginTop: 200 }}
                data={currentQuestion.answers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={1} onPress={() => setChecked(index.toString())}>
                        <View style={{ width: 'auto', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'gray', marginTop: 10, borderRadius: 6, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {GetSvg(item.icon)}
                                <Text style={{ color: 'white', marginStart: 5 }}>{item.name}</Text>
                            </View>
                            <RadioButton borderColor={Colors.mainColor} containerStyle={{ borderRadius: 12, backgroundColor: '#E7FE55' }} borderSize={1} id={index.toString()} onPress={setChecked} selected={index.toString() === checked} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={{ width: '100%', flex: 1, paddingStart: 20, paddingEnd: 20 }} onPress={handleNext} disabled={checked === undefined}>
                <View style={{ width: '100%', height: 50, marginBottom: 100, borderRadius: 18, backgroundColor: checked === undefined ? 'gray' : Colors.mainColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: Colors.mainBackground, fontSize: 25 }}>Continue</Text>
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
