import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, TextInput, Text } from 'react-native';

import styles, { ButtonWithInputStyles } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons'

const ButtonWithInput = ({ onPress, onChangeText, fieldText }) => (
    <View style={ButtonWithInputStyles.container}>

        <TextInput
            style={ButtonWithInputStyles.TextInput}
            value={fieldText}
            placeholder='Todo'
            placeholderTextColor='#999'
            underlineColorAndroid='transparent'
            onChangeText={onChangeText}
            onSubmitEditing={onPress}
        ></TextInput>

        <TouchableOpacity
            style={ButtonWithInputStyles.addButton}
            onPress={onPress}
        >
            <Text
                style={ButtonWithInputStyles.addButtonText}
            >
                <Icon name="send" style={ButtonWithInputStyles.icon}></Icon>
            </Text>
        </TouchableOpacity>

    </View>
);


ButtonWithInput.propTypes = {
    onPress: PropTypes.func,
    onChangeText: PropTypes.func,
    fieldText: PropTypes.string,
};

export default ButtonWithInput;
