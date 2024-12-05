import React from 'react';
import Home from './screens/Home.tsx';
import Quiz from './screens/Quiz.tsx';
import StartScreen from './screens/StartScreen.tsx';
import Onboarding from './screens/Onboarding.tsx';
import {PaperProvider} from "react-native-paper";

function App(): React.JSX.Element {
  return (
      <PaperProvider>
        <Onboarding />
      </PaperProvider>
  );
}

export default App;
