import React from 'react'
import PropTypes from 'prop-types'

import { View, Image, Text } from 'react-native'

import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './styles'

const Logo = ({ name, title }) => (
    <View style={styles.logo}>
        <Icon name={name} style={styles.icon}></Icon>
        <Text style={styles.text}>{title}</Text>
    </View>
)

Logo.defaultProps = {
    name: 'class',
    title: ''
}


export default Logo
