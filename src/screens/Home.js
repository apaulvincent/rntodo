import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { Header } from '../components/Header'
import ES from 'react-native-extended-stylesheet'


import Icon from "react-native-vector-icons/MaterialIcons";

export default class Home extends Component {

    componentDidMount() {
    }

    handlePress = () => {
        this.props.navigation.navigate('TodoList')
    }

    handlePressOptions = () => {
        this.props.navigation.navigate('Options', { title: 'Options' })
    }

    handlePressProjects = () => {
        this.props.navigation.navigate('Projects', { title: 'Projects' })
    }

    render() {

        return (
            <Container>
                <StatusBar
                    backgroundColor="#333"
                    barStyle="light-content"
                    hidden={false}
                ></StatusBar>
                <Header onPress={this.handlePressOptions} />

                <View>
                    <TouchableOpacity onPress={this.handlePress}>
                        <Logo title="TODO" />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={this.handlePressProjects}>
                        <Logo name="style" title="PROJECTS" />
                    </TouchableOpacity>
                </View>

            </Container>
        )

    }

}