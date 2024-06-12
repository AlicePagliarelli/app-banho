import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import pet from "../assets/pet.png"
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome'; 

const Cadastro = () => {
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
    <View style={styles.container} >      
    <Image
    style={styles.image}
    source={{ uri: 'https://uploaddeimagens.com.br/images/004/797/086/original/pet_1.png?1718153010' }}
    onError={(error) => console.error('Error loading image:', error)}
  />
      <View style={styles.formContainer}>
        <View style={styles.inputArea}>
        <View style={styles.signInput}>
          <Icon name="user" size={25} color="#4C8EA4" style={styles.icon} />

            <TextInput
              style={styles.textInput}
              placeholder="Digite seu nome"
              value={emailField}
              onChangeText={t => setEmailField(t)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#4C8EA4"
            />
          </View>
          <View style={styles.signInput}>
          <Icon name="envelope" size={20} color="#4C8EA4" style={styles.icon} />

            <TextInput
              style={styles.textInput}
              placeholder="Digite seu e-mail"
              value={emailField}
              onChangeText={t => setEmailField(t)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#4C8EA4"
            />
          </View>
          <View style={styles.signInput}>
          <Icon name="lock" size={25} color="#4C8EA4" style={styles.icon} />

            <TextInput
              style={styles.textInput}
              placeholder="Digite sua senha"
              value={passwordField}
              onChangeText={t => setPasswordField(t)}
              secureTextEntry
              placeholderTextColor="#4C8EA4"
            />
          </View>
          <TouchableOpacity style={styles.customButton} 
        >
            <Text style={styles.customButtonText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.signMessageButton} 
                  onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.signMessageButtonText}>Ja possui uma conta?</Text>
        <Text style={styles.signMessageButtonTextBold}>Logar-se</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    width: 220,
    height: 220,
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

export default Cadastro;
