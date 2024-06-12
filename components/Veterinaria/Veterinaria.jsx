import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';


// --- Your Styled Components ---
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #97C3D2;
  
`;

export const Scroller = styled.ScrollView`
  zIndex: 10;
  background-color: #FFF;
  flex: 1;
  padding: 10px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  width:auto;
  background-color: #4C8EA4;
`;

export const HeaderTitle = styled.Text`
  width: 250px;
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
`;

// ... (Your other styled components: SearchButton, LocationArea, etc.)


const Veterinaria = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { veterinariaId } = route.params;
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    console.log('ID da clínica:', veterinariaId);
    useEffect(() => {
        fetch(`http://192.168.10.59:5000/api/veterinarias/${veterinariaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error);
            });
    }, [veterinariaId]); // Adicionando 'veterinariaId' como dependência

    const renderService = (_id, name, price) => (
        <View style={styles.serviceContainer}>
            <Text style={styles.serviceText}>
                {name}
                {'\n'}
                {price}
            </Text>
            <TouchableOpacity style={styles.bookButton}  onPress={() => navigation.navigate('Agendamento', { servicoId: _id , veterinariaId })}>
                <Text style={styles.bookButtonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    );
    const styles = StyleSheet.create({
        serviceText: {
            fontWeight: 'bold',
        },
        servicesOverlayContainer: {
            position: 'relative',
            padding: 20,

        },
        servicesList: {
            zIndex: 1,
        },
        overlayContainer: {
            borderRadius: 7,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FFF', // or 'rgba(255, 255, 255, 0.8)' for transparency
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0,
            shadowColor: '#000',
        },
        servicesTitle: {
            color: '#51899B',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: -5,
        },
        serviceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 40,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        serviceName: {
            fontSize: 15,
            color: 'black',
            fontWeight: 'bold',
        },
        servicePrice: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',
        },
        bookButton: {
            backgroundColor: '#4C8EA4',
            padding: 10,
            borderRadius: 5,
        },
        bookButtonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        review: {
            padding: 20,
            backgroundColor: '#4C8EA4',
            borderRadius: 10,
            margin: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.30,
            shadowRadius: 3.87,
            elevation: 5,
        },
        reviewText: {
            fontSize: 14,
            color: '#fff',
        },
        reviewVetName: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    return (
        <Container>
            <HeaderArea>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={{ marginLeft: -20 }} onPress={() => navigation.navigate('Home')}>
                        <Icon name="arrow-left" size={25} marginRight={15} marginLeft={20} marginTop={25} color="white" />
                    </TouchableOpacity>
                    <HeaderTitle marginTop={20}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>{data.nome}</Text>
                    </HeaderTitle>
                </View>

                <View style={{ flexDirection: 'row' }} marginLeft={-20} marginTop={35}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="star" size={14} color="#FFD700" style={{ marginRight: 1, }} /> // Add marginRight
                        ))}
                        <Text style={{ fontSize: 14, color: '#FFD700' }} marginLeft={4}>5.0</Text>
                    </View>

                    <TouchableOpacity>
                        <Icon name="heart" size={20} color="white" marginTop={2} marginLeft={-125} />
                    </TouchableOpacity>
                </View>
            </HeaderArea>
            {/* Services Section */}
            <Scroller>
                <View style={styles.servicesOverlayContainer}>
                    <View style={styles.servicesList}>
                        <Text style={styles.servicesTitle}>Lista de serviços</Text>

                        {/* Check if data.servicos exists and is not empty */}
                        {data.servicos && data.servicos.length > 0 ? (
                            data.servicos.map(service => (
                                renderService(service._id, service.nome, `R$ ${service.preco.toFixed(2)}`)
                            ))
                        ) : (
                            <Text>Nenhum serviço disponível</Text>
                        )}
                    </View>
                </View>
            </Scroller>


            {/* Review Section */}
            <View style={styles.review}>
                <Text style={styles.reviewText}>
                    <Text style={styles.reviewVetName}>{data.nome} {"\n"}</Text>
                    Muito bom o atendimento. Recomendo demais!
                </Text>
            </View>

        </Container>
    );
};
export default Veterinaria;