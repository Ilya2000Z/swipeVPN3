import React from 'react';
import 'react-native-gesture-handler';
import Navigator from './navigation/Navigator.tsx';
import {PaperProvider} from 'react-native-paper';
import {StatusBar} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Colors} from "./theme/Colors.ts";

function App(): React.JSX.Element {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
              <StatusBar
              backgroundColor={Colors.mainBackground}
              />
              <Navigator />
          </PaperProvider>
      </GestureHandlerRootView>
  );
}

export default App;
