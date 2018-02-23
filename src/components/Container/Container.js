import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const Container = ({ children, bgColor }) => (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
        {children}
    </View>
)

Container.propTypes = {
    children: PropTypes.any,
    bgColor: PropTypes.string
}

Container.defaultProps = {
    bgColor: '#f4511e'
}


export default Container
