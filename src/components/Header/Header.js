import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = ({ onPress }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon name="account-circle" style={styles.icon} />
        </TouchableOpacity>
    </View>
);

Header.propTypes = {
    onPress: PropTypes.func,
};

export default Header;