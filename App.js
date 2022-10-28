import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fsRed} from './Styles';
import {PronosScreen} from './components/PronosScreen';
import {ResultsScreen} from './components/ResultsScreen';
import { AboutScreen } from './components/AboutScreen';
import SplashScreen from "react-native-splash-screen";
enableScreens();

const Tab = createBottomTabNavigator();



// create stack for navigation with screens (only info screen for now)
const PronosStack = createStackNavigator();


function Tabs(){
  return (
  <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName= "trophy-outline";
            if (route.name === 'Pronostics') {
              iconName = "football-outline"
            } else if (route.name === 'Résultats') {
              iconName = "trophy-outline"
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: fsRed,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Pronostics" component={PronosScreen} initialParams={{ vue: 0}}/>
        <Tab.Screen name="Résultats" component={ResultsScreen} />
      </Tab.Navigator>
  )
}

export default function App() {
  
  React.useEffect(()=>{
    setTimeout((()=>{
        SplashScreen.hide();
    }), 1500)
  }, [])
  return (
    <NavigationContainer>
      <PronosStack.Navigator screenOptions={{headerShown: false}} >
      <PronosStack.Screen name="Tabs" component={Tabs}/>
      <PronosStack.Screen name="About" component={AboutScreen}/>
    </PronosStack.Navigator>

    </NavigationContainer>
  );
}