import React from 'react'
import { View, Image, Text } from 'react-native'

import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './styles'

const Logo = () => (
    <View style={styles.logo}>
        <Icon name="class" style={styles.icon}></Icon>
        <Text style={styles.text}>MeMa</Text>
    </View>
)

export default Logo
