import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    UIManager,
    Animated,
    Easing,
    findNodeHandle,
    Dimensions,
} from "react-native"

import PropTypes from 'prop-types'
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from './styles'

export default class Popover extends Component {

    static PropTypes

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            width: 0,
            position: new Animated.ValueXY(0),
            opacity: new Animated.Value(0),
            overlayOpacity: new Animated.Value(0),
            scale: new Animated.Value(0.9),
        };
    }

    componentWillMount() {

        const { width, position } = this.props

        this.setState({
            width: width,
            position: position
        }, () => {

            Animated.parallel([
                Animated.timing(this.state.overlayOpacity, {
                    toValue: 0.4,
                    duration: 300,
                }),
                Animated.timing(this.state.opacity, {
                    toValue: 1,
                    duration: 300,
                }),
                Animated.spring(this.state.scale, {
                    toValue: 1,
                    friction: 5,
                    tension: 40
                })
            ]).start();

        })

    }

    handleClose = () => {
        this.props.handleClose();
    }

    getPosition = () => {

        const { width, height } = Dimensions.get('window');

        return (height / 2) - 200

    }

    render() {
        const { width, overlayOpacity, opacity, position, scale } = this.state;

        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                }}
            >
                <Animated.View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    opacity: overlayOpacity,
                }}>
                </Animated.View>
                <Animated.View
                    style={[
                        {
                            width: width,
                            opacity: opacity,
                            height: 300,
                            transform: [
                                {
                                    translateY: opacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [position.y, this.getPosition()]
                                    })
                                },
                                {
                                    translateX: position.x
                                },
                                {
                                    scale: scale
                                }
                            ]
                        },
                        styles.container
                    ]}
                >
                    <TouchableOpacity onPress={this.handleClose} style={styles.close}>
                        <Icon name="close" size={22} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.modalHead}>
                        <Image source={require('./Images/img01.png')} style={styles.modalBanner}></Image>
                    </View>

                    <View style={styles.modalBody}>
                        {this.props.children}
                    </View>

                </Animated.View>
            </View>

        )

    }
}