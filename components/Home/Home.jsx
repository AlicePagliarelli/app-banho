import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View, Image } from 'react-native';
import pet from "../assets/pet.png"
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';



import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea,
} from './styles';




const Home = () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    // Dados mockados para a lista
    const vetData = [
        { id: '1', name: 'Veterinária A' , star: 5 , foto:''},
        { id: '2', name: 'Veterinária B', star: 3, foto:'' },
        { id: '3', name: 'Veterinária C', star: 2, foto:'' },
        { id: '4', name: 'Veterinária D', star: 2,foto:'' }, // Exemplo de gato
        { id: '5', name: 'Veterinária E', star: 2, foto:''},
    ];
    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result == 'granted') {

            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getVet();
            });

        }
    }

    const getVet = async () => {
        setLoading(true);
        setList([]);
        console.log(coords);

        setLoading(false);
    }

    useEffect(() => {
        getVet();
    }, []);
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            if (item.id === '1') {
                navigation.navigate('Veterinaria'); // Navegar para outra aba
            }
        }}>
            <View style={styles.petItem}>
                <Image source={item.foto} style={styles.petImage} />
                <View style={styles.petInfo}>
                    <Text style={styles.petName}>{item.name}</Text>
                    <View style={styles.starContainer}>
                        {Array.from({ length: item.star }, (_, index) => (
                            <Icon key={index} name="star" size={16} color="#FFD700" />
                        ))}
                        <Text style={styles.starText}> ({item.star})</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
            

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
                    data={vetData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            </Scroller>
        </Container>
    );
}
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
        backgroundColor:'pink',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    petInfo: {
        flex: 1,
    },
    starText: {
        marginLeft: 5,
      },
    starContainer: {
        flexDirection: 'row', // Alinha os itens horizontalmente
        alignItems: 'center', // Alinha verticalmente ao centro (opcional)
      },
    petName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    petBreed: {
        fontSize: 14,
    },
    petAge: {
        fontSize: 12,
    },
});
export default Home;