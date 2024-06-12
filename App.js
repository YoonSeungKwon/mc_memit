import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SocialScreen from './screens/SocialScreen';
import DetailScreen from './screens/DetailScreen';
import SplashScreen from './screens/SplashScreen';
import WriteScreen from './screens/WriteScreen';
import SettingScreen from './screens/SettingScreen';
import PersonalScreen from './screens/PersonalScreen';
import RegisterScreen from './screens/RegisterScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name="PersonalScreen" component={PersonalScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SocialScreen" component={SocialScreen} options={{headerShown:false}}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown:false}}/>
        <Stack.Screen name="WriteScreen" component={WriteScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{headerShown:false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
