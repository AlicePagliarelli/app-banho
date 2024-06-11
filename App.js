import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro'; 
import Home from './components/Home/Home';
import Veterinaria from './components/Veterinaria/Veterinaria';
import Agendamento from './components/Agendamento/Agendamento';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './components/CustomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Tab.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}}/>
        <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Tab.Screen name="Veterinaria" component={Veterinaria} options={{headerShown:false}}/>
        <Tab.Screen name="Agendamento" component={Agendamento} options={{headerShown:false}}/>
      </Tab.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
