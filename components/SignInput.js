import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 300px;
    height: 60px;
    background-color: #C1DEE7;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 25px;
    align-items: center;
    margin-bottom: 15px;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #4C8EA4;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
    return (
        <InputArea>
            <IconSvg width="25" height="25" fill="#4C8EA4" />
            <Input 
                placeholder={placeholder}
                placeholderTextColor="#4C8EA4"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
            />
        </InputArea>
    );
}