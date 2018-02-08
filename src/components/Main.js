import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, 
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

import Note from './Note';
import Popover from './Popover';


export default class Main extends Component<{}> {

    constructor(props) {
        super(props)

        this.scrollValue = new Animated.Value(0)

        const { width, height } = Dimensions.get('window');
        const edgeLength = 100;
        const axisX = (width / 2) - (edgeLength / 2);
        const axisY = (height / 2) - (edgeLength / 2);

        this.state = {
            todoText: '',
            todoItemMeasure: null,
            //panAnimation: new Animated.ValueXY({ x: axisX , y: axisY }),
            position:  new Animated.ValueXY(0),
            opacity:  new Animated.Value(0),
            scaleValue:  new Animated.Value(0.5),
        }
    }

    componentDidMount(){
        
        this.fetchData().then(res => {
            this.props.fetchTodos(res)
        });

    }

    saveData = (obj) => {

        const { todos } = this.props;

        AsyncStorage.setItem('rntodo', JSON.stringify([obj, ...todos]));

    }

    fetchData = async () => {

        try {
            
            let todos = await AsyncStorage.getItem('rntodo');

            return JSON.parse(todos);

        } catch (error) {

            alert(error)

        }

    }

    handleChangeText = (text) => {
        this.setState({
            todoText : text
        })
    }

    addTodo = () => {

        if( this.state.todoText == '' ) return;

        const d = new Date();
        const id = d.getTime();
        const todo = this.state.todoText;
        const date = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();

        this.props.addTodo(id, todo, date);

        this.saveData({id, todo, date});

        this.setState({
            todoText: ''
        });

    }

    editTodo = (dimension) => {

        let {position, opacity, scaleValue} = this.state;

        this.setState({
            todoItemMeasure: dimension,
            position: {x: dimension.x , y: (dimension.y - this.scrollValue.__getValue() ) + dimension.h }

        }, () => {

            Animated.parallel([
                Animated.timing( opacity, {
                    toValue: 1,
                    duration: 300,
                }),
                Animated.spring( scaleValue, {
                    toValue: 1,
                    friction: 5,
                    // tension: 40
                })
            ]).start();

        });
        
    } 

    renderTodoItem = () => {

        const {todos} = this.props;

        if( todos.length > 0 ) {

            return todos.map((t, i) => {
                return <Note key={i} todo={t} />
            })

        } else {
            return <View style={styles.todo}><Text>Nothing to do</Text></View>
        }


    }

    handleModalClose = () => {

    }

    render() {

        let {todoItemMeasure, position, opacity, scaleValue} = this.state;

        let handleScroll = Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollValue}}},
        ])

        return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerText}>+</Text>
            </View>

            <ScrollView style={styles.scrollContainer} scrollEventThrottle={16} onScroll={handleScroll}>
                { this.renderTodoItem() }
            </ScrollView>

            {
                todoItemMeasure ? <Popover 
                                        width={todoItemMeasure.w} 
                                        scale={scaleValue} 
                                        opacity={opacity} 
                                        position={position}
                                        handleClose={this.handleModalClose}
                                        >
                                        <Text style={{fontSize: 22}}>Title</Text>
                                 </Popover> : null
            }

            <View style={styles.footer}>
                <TextInput
                    style={styles.TextInput}
                    value={this.state.todoText}
                    placeholder='Note'
                    placeholderTextColor='black'
                    underlineColorAndroid='transparent'
                    onChangeText={ this.handleChangeText }
                    onSubmitEditing={ this.addTodo }
                ></TextInput>
            </View>

            <TouchableOpacity 
                style={styles.addButton}
                onPress={ this.addTodo }
            >
                <Text
                    style={styles.addButtonText}
                >ADD</Text>
            </TouchableOpacity>


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
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
  container: {
    flex: 1,
  },
  header: {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd'
  },
  headerText: {
    fontSize: 18,
    padding: 20
  },
  scrollContainer: {
    flex: 1,
  },
  footer: {

  },
  TextInput: {
    alignSelf: 'stretch',
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#ddd'
  },
  addButton:  {
    position: 'absolute',
    zIndex: 1,
    right: 12,
    bottom: 12,
    width: 82,
    height: 42,
    paddingLeft: 20, 
    paddingRight: 20, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor: '#e91e63'
  },
  addButtonText: {
    color: '#fff'
  },
});
