import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import pet from "../assets/pet.png"
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome'; 

const Agendamento = () => {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const navigation = useNavigation();

  const handleSignClick = () => {
    // Lógica de login aqui
  };

  const handleMessageButtonClick = () => {
    // Navegação para a tela de cadastro
  };

  return (
    <View>
        <Text>Veterinária A</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#97C3D2',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    backgroundColor:'black',
    marginBottom: 20,
    width: 200,
    height: 200,
  },
  inputArea: {
    width: '100%',
  },
  signInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#4C8EA4',
    paddingBottom: 10,
    width: '100%', 
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
  customButton: {
    backgroundColor: '#12566C',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signMessageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signMessageButtonText: {
    color: '#ffffff',
  },
  signMessageButtonTextBold: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Agendamento;
