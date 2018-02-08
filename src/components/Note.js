import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  UIManager,
  Animated,
  AsyncStorage,
  findNodeHandle,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Icon from 'react-native-vector-icons/MaterialIcons'
import measureNode from '../helpers/measureNode'


class Note extends Component<{}> {

    constructor(props){
        super(props)

        const { width, height } = Dimensions.get('window');
        const edgeLength = 100;
        const axisX = (width / 2) - (edgeLength / 2);
        const axisY = (height / 2) - (edgeLength / 2);

        this.state = {
            noteText: '',
            noteItemMeasure: null,
            panAnimation: new Animated.ValueXY({ x: axisX , y: axisY }),
            scaleAnimation: new Animated.Value(30),
            dimension: null,
            isEditing: false
        }

    }

    componentDidMount(){

    }


    deleteData = (id) => {

        const { todos } = this.props;

        const newTodos = todos.filter( t => {
            return t.id != id
        })

        AsyncStorage.setItem('rntodo', JSON.stringify(newTodos));

    }


    getDimension = async () => {
        
        const item = findNodeHandle(this.refs.itemWrap)

        try {

            let itemDimension = await measureNode(item)

            return itemDimension;
                
        } catch (err) {
            console.log(err)
        }

    }

    handleEdit = () =>  {

        this.getDimension().then( res => {
            this.props.handleEdit( res )
        })
        
    }

    handleDelete = (id) => {

        this.props.deleteTodo(id)
        this.deleteData(id);

    }

  render() {

    const { todo } = this.props

    const trunc = todo.todo.length < 20 ? todo.todo :  todo.todo.trim().substring(0, 20) + '...';

    return (
        <View key={todo.id} style={styles.todo} ref="itemWrap">
            
            <View style={styles.itemData}>
                <Text style={ styles.largeText  }>{ trunc + ' ' + todo.id }</Text>
                <Text style={ styles.smallText } >{ todo.date}</Text>
            </View>

            <View style={styles.itemControls}>
                <TouchableOpacity onPress={this.handleEdit} >
                    <Text style={styles.noteEdit}>
                        <Icon name="create" size={24}></Icon>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleDelete(todo.id) } >
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
    todo: {
        overflow: 'visible',
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



const mapStateToProps = (state) => {
    return {
        todos: state.todos,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Note)