import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SocialScreen from './screens/SocialScreen';
import DetailScreen from './screens/DetailScreen';
import SplashScreen from './screens/SplashScreen';
import WriteScreen from './screens/WriteScreen';
import SettingScreen from './screens/SettingScreen';
import PersonalScreen from './screens/PersonalScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Accelerometer } from 'expo-sensors';
import * as Font from 'expo-font';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

LogBox.ignoreAllLogs();

const App = () => {
  const navigationRef = React.createRef();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let lastUpdate = 0;
    let lastX, lastY, lastZ;

    // const getFont = async() => {
    //   await Font.loadAsync({
    //     "nanum1": require('./assets/fonts/nanum1.ttf'),
    //     "nanum2": require('./assets/fonts/nanum2.ttf'),
    //   })
    //   setFontsLoaded(true);
    // }

    // getFont();

    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const currTime = Date.now();

      if ((currTime - lastUpdate) > 100) {
        const diffTime = currTime - lastUpdate;
        lastUpdate = currTime;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > 8000) {
          navigationRef.current?.navigate('ChatScreen');
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    });

    return () => subscription && subscription.remove();
  }, []);
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
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
