import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// --- Your Styled Components ---
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

    const renderService = (name, price) => (
        <View style={styles.serviceContainer}>
            <Text style={styles.serviceName}>{name}</Text>
            <Text style={styles.servicePrice}>{price}</Text>
            <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    );
    const styles = StyleSheet.create({
        servicesOverlayContainer: {
            position: 'relative',
            padding: 20,
        },
        servicesList: {
            zIndex: 1,
        },
        overlayContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ffff', // or 'rgba(255, 255, 255, 0.8)' for transparency
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0,
        },
        servicesTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        serviceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        serviceName: {
            fontSize: 14,
            color: '#51899B',
            fontWeight: 'bold',
        },
        servicePrice: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#51899B',
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
            backgroundColor: '#fff',
            borderRadius: 10,
            margin: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        reviewText: {
            fontSize: 14,
            color: '#000',
        },
        reviewVetName: {
            fontWeight: 'bold',
        },
    });

    return (
        <Container>
            <HeaderArea>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={{ marginLeft: -20 }} onPress={() => navigation.navigate('Home')}>
                        <Icon name="arrow-left" size={25} marginRight={12} marginLeft={8} marginTop={2} color="#000" />
                    </TouchableOpacity>
                    <HeaderTitle>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}>Veterinária A</Text>
                    </HeaderTitle>
                </View>

                <View style={{ flexDirection: 'row' }} marginLeft={-20} marginTop={10}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {[...Array(5)].map((_, i) => (
                            <Icon key={i} name="star" size={14} color="#FFD700" style={{ marginRight: 1, }} /> // Add marginRight
                        ))}
                        <Text style={{  fontSize: 14, color: '#FFD700' }} marginLeft={4}>5.0</Text>
                    </View>

                    <TouchableOpacity>
                        <Icon name="heart" size={20} color="black" marginTop={2} marginLeft={-120} />
                    </TouchableOpacity>
                </View>
            </HeaderArea>

            <Scroller>
                {/* Services Section */}
                <View style={styles.servicesOverlayContainer}>
                    <View style={styles.servicesList}>
                        <Text style={styles.servicesTitle}>Lista de serviços</Text>
                        {renderService('Banho (Porte pequeno)', 'R$ 35,00')}
                        {renderService('Banho + Tosa (Porte pequeno)', 'R$ 75,00')}
                        {renderService('Banho (Porte médio)', 'R$ 45,00')}
                        {renderService('Banho + Tosa (Porte médio)', 'R$ 85,00')}
                    </View>
                    <View style={styles.overlayContainer} />
                </View>

                {/* Review Section */}
                <View style={styles.review}>
                    <Text style={styles.reviewText}>
                        <Text style={styles.reviewVetName}>Veterinária A </Text>
                        Muito bom o atendimento. Recomendo demais!
                    </Text>
                </View>
            </Scroller>
        </Container>
    );
};
export default Veterinaria;