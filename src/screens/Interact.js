import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions
} from 'react-native'

import ES from 'react-native-extended-stylesheet';
import RNCalendarEvents from 'react-native-calendar-events';
import Interactable from 'react-native-interactable';


const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
};



export default class Interact extends Component {

    constructor(props) {
        super(props)

        state = {
        }
    }

    componentWillMount() {

    }

    render() {

        return (

            <View style={styles.container}>
                <Interactable.View
                    key="third"
                    verticalOnly={true}
                    initialPosition={{ x: 0, y: Screen.height - 100 }}
                    snapPoints={[
                        { y: Screen.height - 100, damping: 0.7 },
                        { y: Screen.height / 2 - 300, damping: 0.7 }
                    ]}>
                    <View style={styles.card}>
                        <Text>Pull Me</Text>
                    </View>

                    <ScrollView style={styles.card1}>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                        <Text>Foobar</Text>
                    </ScrollView>

                </Interactable.View>
            </View>
        )


    }

}


const styles = ES.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    card: {
        width: 300,
        height: 100,
        backgroundColor: '#ffcccc',
        borderRadius: 0
    },

    card1: {
        width: 300,
        height: 200,
        minHeight: 200,
        backgroundColor: '#5d9de4',
        borderWidth: 0,
    }
})
