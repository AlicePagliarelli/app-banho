import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

// Styled Components
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #97C3D2;
`;

export const Scroller = styled.ScrollView`
  background-color: #FFF;
  flex: 1;
  padding: 5px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top:20;
  padding: 20px;
  background-color: #4C8EA4;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
`;

// Main Component
const Veterinaria = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { veterinariaId } = route.params;
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const scrollViewRef = useRef(null);

    const [activeSlide, setActiveSlide] = useState(0);

    const goToSlide = (index) => {
        setActiveSlide(index);
        scrollViewRef.current.scrollTo({ x: index * windowWidth, animated: true });
    };

    const windowWidth = Dimensions.get('window').width;

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
                setComentarios(data.comentarios);
            })
            .catch(error => {
                setError(error);
            });
    }, [veterinariaId]);

    useEffect(() => {
        if (comentarios.length > 0) {
            goToSlide(0);
        }
    }, [comentarios]);

    const renderService = (_id, name, price) => (
        <View key={_id} style={styles.serviceContainer}>
            <Text style={styles.serviceText}>{name}{'\n'}{price}</Text>
            <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Agendamento', { servicoId: _id, veterinariaId })}>
                <Text style={styles.bookButtonText}>Agendar</Text>
            </TouchableOpacity>
        </View>
    );

    const styles = StyleSheet.create({
        slideContainer: {
            width: windowWidth - 30,
            marginHorizontal: 10,
            marginTop: 50,
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#4C8EA4',
        },
        slideContent: {
            alignItems: 'center',
        },
        ratingStars: {
            flexDirection: 'row',
            marginBottom: 10,
        },
        arrowContainer: {
            flexDirection: 'row',
            marginTop: 10,
            width: '100%',
            justifyContent: 'space-between',
        },
        arrow: {
            padding: 10,
        },
        serviceText: {
            fontWeight: 'bold',
        },
        servicesOverlayContainer: {
            position: 'relative',
            padding: 0,
        },
        servicesList: {
            zIndex: 1,
        },
        servicesTitle: {
            color: '#51899B',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        serviceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 25,
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
        reviewVetName: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
        },
        reviewText: {
            fontSize: 16,
            color: '#fff',
        },
    });

    return (
        <Container>
            <HeaderArea>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Home')}>
                        <Icon name="arrow-left" size={25} color="white" />
                    </TouchableOpacity>

                    <HeaderTitle marginTop={20}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>
                            {data.nome}
                        </Text>
                    </HeaderTitle>

                    {/* Star Rating and Heart Icon Section */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                        {/* Auto-margin to the right */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {[...Array(4)].map((_, i) => (
                                <Icon key={i} name="star" size={14} color="#FFD700" style={{ marginRight: 1 }} />
                            ))}
                            <Text style={{ fontSize: 14, color: '#FFD700' }} marginLeft={4}>
                               {data.mediaAvaliacoes}
                            </Text>
                        </View>

                        <TouchableOpacity>
                            <Icon name="heart" size={20} color="white" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </HeaderArea>

            <Scroller>
                <View style={styles.servicesOverlayContainer}>
                    <View style={styles.servicesList}>
                        <Text style={styles.servicesTitle}>Lista de serviços</Text>
                        {data.servicos && data.servicos.length > 0 ? (
                            data.servicos.map(service => renderService(service._id, service.nome, `R$ ${service.preco.toFixed(2)}`))
                        ) : (
                            <Text>Nenhum serviço disponível</Text>
                        )}
                    </View>
                </View>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    onMomentumScrollEnd={(event) => {
                        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
                        setActiveSlide(slideIndex);
                    }}
                >
                    {comentarios.map((comentario, index) => (
                        <View key={index} style={styles.slideContainer}>
                            <View style={styles.slideContent}>
                                <Text style={styles.reviewVetName}>{data.nome}</Text>
                                <View style={styles.ratingStars}>
                                    {Array.from({ length: comentario.avaliacao }, (_, i) => (
                                        <Icon key={i} name="star" size={20} color="gold" />
                                    ))}
                                </View>
                                <Text style={styles.reviewText}>{comentario.texto}</Text>
                                <View style={styles.arrowContainer}>
                                    <TouchableOpacity onPress={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0}>
                                        <Icon name="chevron-left" size={24} color={activeSlide === 0 ? "gray" : "white"} style={styles.arrow} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => goToSlide(activeSlide + 1)} disabled={activeSlide === comentarios.length - 1}>
                                        <Icon name="chevron-right" size={24} color={activeSlide === comentarios.length - 1 ? "gray" : "white"} style={styles.arrow} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Scroller>
        </Container>
    );
};
export default Veterinaria;
