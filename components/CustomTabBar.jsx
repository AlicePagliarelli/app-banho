import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const TabArea = styled.View`
    height: 60px;
    background-color: #6CB1C7;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

const CustomTabBar = ({ state, navigation }) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <TabArea>
            <TabItem onPress={() => goTo('Home')}>
            <Icon name="home" size={30} color="#FFF" />

            </TabItem>
            <TabItem onPress={() => goTo('Search')}>
            <Icon name="search" size={25} color="#FFF"  />
            </TabItem>
            <TabItemCenter onPress={() => goTo('Agendamento')}>
            <Icon name="calendar-check-o" size={35} color="#6CB1C7" />

            </TabItemCenter>
            <TabItem onPress={() => goTo('Favorites')}>
            <Icon name="heart-o" size={25} color="#FFF" />
            </TabItem>
            <TabItem onPress={() => goTo('Profile')}>
            <Icon name="user-circle-o" size={27} color="#FFF" />
              
            </TabItem>
        </TabArea>
    );
};

export default CustomTabBar;
