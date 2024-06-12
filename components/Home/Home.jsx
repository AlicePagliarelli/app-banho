import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import pet from '../assets/pet.png';

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    ListArea,
} from './styles';

const Home = () => {
    const navigation = useNavigation();
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://192.168.10.59:5000/api/reviews/medias')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleLocationFinder = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log('Permission status:', status);

            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            setLoading(true);
            setLocationText('');
            setList([]);

            let location = await Location.getCurrentPositionAsync({});
            setCoords(location.coords);
            console.log('Current location:', location);
            getVet();
        } catch (err) {
            console.error('Error getting location permissions or current location:', err);
            setError(err);
        }
    };

    const getVet = async () => {
        setLoading(true);
        setList([]);
        // Here you would make an API call to get vets based on coords if needed
        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Veterinaria', { veterinariaId: item._id })}>

            <View style={styles.petItem}>
                <Image source={item.foto ? { uri: item.foto } : pet} style={styles.petImage} />
                <View style={styles.petInfo}>
                    <Text style={styles.petName}>{item.nome}</Text>
                    <View style={styles.starContainer}>
                        {Array.from({ length: item.mediaAvaliacoes }, (_, index) => (
                            <Icon key={index} name="star" size={16} color="#FFD700" />
                        ))}
                        <Text style={styles.starText}> ({item.mediaAvaliacoes})</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loading}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.error}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre sua veterinária favorita</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Home')}>
                        <Icon name="home" size={30} color="#4C8EA4" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <Icon name="location-arrow" size={25} color="#ffffff" />
                    </LocationFinder>
                </LocationArea>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            </Scroller>
        </Container>
    );
};

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
    },
    petItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    petImage: {
        backgroundColor: 'pink',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    petInfo: {
        flex: 1,
    },
    starText: {
        fontSize: 12,
        marginLeft: 5,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    petName: {
        fontSize: 17,

    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
