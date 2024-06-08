import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro'; 
import Home from './components/Home/Home';
import Veterinaria from './components/Veterinaria/Veterinaria';
import Agendamento from './components/Agendamento/Agendamento';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Veterinaria" component={Veterinaria} options={{headerShown:false}}/>
        <Stack.Screen name="Agendamento" component={Agendamento} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
