// @ts-nocheck
import React, {useState} from 'react';

import {Provider} from 'react-redux';
import {NavigationService} from 'services';
import {StatusBar, SafeAreaView} from 'react-native';
import configureStore from 'store';
import Switch from 'navigator';
import {DarkModeProvider, initialMode} from 'react-native-dark-mode';

console.disableYellowBox = true;

const ApplicationContent = () => (
  <Switch
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
);

const App = () => {
  const store = configureStore();

  // const [mode, setMode] = useState(initialMode);
  // const toggleMode = () => {
  //   setMode(mode === 'light' ? 'dark' : 'light');
  // };

  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      {/* <DarkModeProvider mode={{mode, toggleMode}}> */}
      <DarkModeProvider>
        <ApplicationContent />
      </DarkModeProvider>
    </Provider>
  );
};

export default App;
