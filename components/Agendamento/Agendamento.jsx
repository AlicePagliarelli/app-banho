import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #97C3D2;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: space-between;
  width: 540px;
  height: auto;
  padding: 20px;
  margin-top: -25px;
  margin-left: -20px;
  background-color: #4C8EA4;
  margin-bottom: 23px;
`;

export const HeaderTitle = styled.Text`
  width: 250px;
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
`;

const Agendamento = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [servicoId] = useState('666877e7a10ef3663e93f809');
  const [veterinariaId] = useState('66685443cb8b998c0a61904d');
  const [currentMonth, setCurrentMonth] = useState(moment());
  const route = useRoute();
  const parametros = route.params;
  const [price, setPrice] = useState(80);
  const navigation = useNavigation();

  console.log("parametros", parametros);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      setCurrentMonth(currentMonth.clone().subtract(1, 'months'));
    } else if (direction === 'next') {
      setCurrentMonth(currentMonth.clone().add(1, 'months'));
    }
  };

  const renderDates = () => {
    const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
    const endOfMonth = currentMonth.clone().endOf('month').endOf('week');
    const dates = [];
    let day = startOfMonth.clone();

    while (day.isBefore(endOfMonth, 'day')) {
      dates.push(day.clone());
      day.add(1, 'day');
    }

    return dates.map((date, index) => (
      <TouchableOpacity
        key={date.format('DD') + '-' + index}
        style={[
          styles.date,
          selectedDate === date.format('YYYY-MM-DD') ? styles.selected : null,
        ]}
        onPress={() => handleDateChange(date.format('YYYY-MM-DD'))}
      >
        <Text
          style={[
            styles.data,
            selectedDate === date.format('YYYY-MM-DD') ? styles.selected : null,
          ]}
        >
          {date.format('DD')}
        </Text>
      </TouchableOpacity>
    ));
  };

  const handleAppointment = async () => {
    const appointmentDetails = {
      servicoId,
      date: selectedDate,
      time: selectedTime,
      price,
      veterinariaId,
    };

    // Imprimir o corpo da requisição antes de enviar
    console.log('Body da requisição:', JSON.stringify(appointmentDetails));

    try {
      const response = await fetch('http://192.168.10.59:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentDetails),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Agendamento efetuado com sucesso!');
        navigation.navigate('Home');
      } else {
        console.error('Erro no agendamento:', result);
        Alert.alert('Erro', 'Falha ao efetuar agendamento. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao efetuar agendamento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar efetuar o agendamento. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderArea>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity style={{ marginLeft: 0 }} onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" size={25} marginRight={40} marginLeft={0} marginTop={25} color="white" />
          </TouchableOpacity>
          <HeaderTitle marginTop={20}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFF' }}>{route.params.data?.nome || 'Agendamento'}</Text>
          </HeaderTitle>
        </View>
      </HeaderArea>

      <View marginLeft={25} style={styles.serviceInfo}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}>Banho (Porte pequeno)</Text>
        <Text>R$ 35,00</Text>
      </View>

      <View style={styles.calendar}>
        <View style={styles.monthNavigation}>
          <TouchableOpacity onPress={() => handleMonthChange('prev')}>
            <Text style={styles.direct}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.moth}>{currentMonth.format('MMMM YYYY')}</Text>
          <TouchableOpacity onPress={() => handleMonthChange('next')}>
            <Text style={styles.direct}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.days}>
          {moment.weekdaysShort(true).map((day, index) => (
            <Text key={index} style={styles.day}>{day}</Text>
          ))}
        </View>
        <View style={styles.dates}>
          {renderDates()}
        </View>
      </View>

      <View style={styles.timeSlots}>
        {['13:00', '14:00', '15:00', '16:00'].map((time) => (
          <TouchableOpacity
            key={time}
            style={[styles.timeSlot, selectedTime === time && styles.selected]}
            onPress={() => handleTimeChange(time)}
          >
            <Text style={[
              styles.data,
              selectedTime === time ? styles.selected : null,
            ]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.finalizeButton} onPress={handleAppointment}>
        <Text style={styles.text}>Finalizar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  moth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  home: {
    marginTop: 43,
    fontSize: 35,
    fontWeight: 'bold',
  },
  direct: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#97C3D2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  vetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vetImagePlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  serviceInfo: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    marginBottom: 20,
    elevation: 10,
  },
  calendar: {
    marginBottom: 20,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  day: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  date: {
    width: '13%',
    textAlign: 'center',
    padding: 10,
    margin: 2,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  selected: {
    backgroundColor: '#4C8EA4',
    color: 'white'
  },
  data: {
    textAlign: 'center',
    color: '#2F7288',
    fontWeight: 'bold',
  },
  timeSlots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeSlot: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    margin: 2,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  finalizeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#4C8EA4',
    borderRadius: 5,
    alignItems: 'center',
    elevation: 3,
  },
});

export default Agendamento;
