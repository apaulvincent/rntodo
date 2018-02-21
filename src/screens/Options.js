import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import ES from 'react-native-extended-stylesheet';
import RNCalendarEvents from 'react-native-calendar-events';



export default class Options extends Component {

    constructor(props) {
        super(props)

        state = {
            status: ''
        }
    }


    componentWillMount() {

        RNCalendarEvents.authorizationStatus().then(status => {

            this.setState({
                status: status
            })

            if (status === 'undetermined') {
                RNCalendarEvents.authorizeEventStore()
                    .then(out => {
                        if (out == 'authorized') {
                            // set the new status to the auth state
                            this.setState({ status: out })
                        }
                    })
            }
        }).catch(error => alert('Auth Error: ', error));

    }


    setEvent = async () => {

        RNCalendarEvents.saveEvent(
            'Makuna Matata 27', {
                location: 'Cainta',
                notes: 'Pabebe',
                description: 'Pakeke',
                startDate: '2018-02-19T11:54:00.000Z',
                endDate: '2018-02-19T12:02:00.000Z',
                calendar: ['Calendar'],
                alarms: [{
                    date: 1
                }]
            }).then(id => {
                alert('this ma Id: ' + id)
            }).catch(error => {
                alert(error)
            })
    }

    render() {

        return (

            <View style={styles.container}>

                <TouchableOpacity onPress={this.setEvent}>
                    <Text>Options</Text>
                </TouchableOpacity>

            </View>

        )


    }

}


const styles = ES.create({
    container: {
        flex: 1,
    },
})
