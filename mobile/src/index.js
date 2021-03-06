import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import '~/config/ReactotronConfig';

import {Provider} from 'react-redux';
import store from './store';

import Routes from './routes';

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={useColorScheme() === 'dark' ? eva.dark : eva.light}>
      <Provider store={store}>
        <NavigationContainer
          theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
          <Routes />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  </>
);

export default App;
