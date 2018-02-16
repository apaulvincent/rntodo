import React from 'react'
import { View, Image, Text } from 'react-native'

import ES from 'react-native-extended-stylesheet';

const Options = () => (
    <View style={styles.container}>
        <Text>Options</Text>
    </View>
)

export default Options

const styles = ES.create({
    container: {
        flex: 1,
    },
})
