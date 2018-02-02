import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons'


export default class Note extends Component<{}> {

    constructor(props){
        super(props)

        this.state = {
            dimension: null
        }
    }


    getDimension = (e) => {
        console.log(e.nativeEvent)
        this.setState({
            dimension: e.nativeEvent.layout
        })

    }

    handleEdit = () =>  {

        const { dimension } = this.state

        this.props.handleEdit( dimension )
    }


  render() {


    const trunc = this.props.val.note.length < 20 ? this.props.val.note :  this.props.val.note.trim().substring(0, 20) + '...';

    return (
        <View key={this.props.keyval} style={styles.note} onLayout={ this.getDimension }>

            <View style={styles.itemData}>
                <Text style={ styles.largeText  }>{ trunc }</Text>
                <Text style={ styles.smallText } >{ this.props.val.date}</Text>
            </View>

            <View style={styles.itemControls}>
                <TouchableOpacity onPress={this.handleEdit} >
                    <Text style={styles.noteEdit}>
                        <Icon name="create" size={24}></Icon>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.handleDelete} >
                    <Text style={styles.noteDelete}>
                        <Icon name="delete-sweep" size={24}></Icon>
                    </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
  }
}


const styles = StyleSheet.create({
    note: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 10,
    },
    itemControls: {
        flexDirection: 'row'
    },
    noteDelete: {
        padding: 10,
    },
    noteEdit:  {
        padding: 10,
    },
    smallText: {
        fontSize: 10
    },
    largeText: {
        fontSize: 16
    }
    
})