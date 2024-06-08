import React, { createContext, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const showAlert = (msg, alertType) => {
    setMessage(msg);
    setType(alertType);
    setVisible(true);
  };

  const hideAlert = () => setVisible(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={hideAlert}
        style={[styles.snackbar, type === 'success' ? styles.success : styles.error]}
      >
        <Text>{message}</Text> 
      </Snackbar>

    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    borderRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
});
export default AlertContext;