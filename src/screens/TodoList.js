import React, { Component } from 'react'
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
} from 'react-native'


import { Note } from '../components/Note'
import { Popover } from '../components/Popover'
import { ButtonWithInput } from '../components/Button'

import PropTypes from 'prop-types'


import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions";


import * as helpers from '../helpers'

import ES from 'react-native-extended-stylesheet';


class TodoList extends Component {

    constructor(props) {
        super(props)

        this.scrollValue = new Animated.Value(0)

        const { width, height } = Dimensions.get('window');
        const edgeLength = 100;
        const axisX = (width / 2) - (edgeLength / 2);
        const axisY = (height / 2) - (edgeLength / 2);

        this.state = {
            panAnimation: new Animated.ValueXY({ x: axisX, y: axisY }),
            todoText: '',
            showModal: false,
            geometry: null,
            position: 0,
            opacity: 0,
            scale: 0.5,
            currentTodo: null
        }
    }

    componentDidMount() {

        // REMOVE ALL RECORDS ON ASYNSTORAGE
        // AsyncStorage.removeItem('rntodo');

        this.props.fetchTodos()

    }

    handleChangeText = (text) => {
        this.setState({
            todoText: text
        })
    }

    addTodo = () => {

        if (this.state.todoText == '') return;

        const d = new Date();
        const id = d.getTime();
        const todo = this.state.todoText;
        const date = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();

        this.props.addTodo(id, todo, date);

        this.setState({
            todoText: ''
        });

    }

    editTodo = () => {

    }

    openModal = (geometry, todo) => {

        let { position, opacity } = this.state;

        this.setState({
            showModal: true,
            geometry: geometry,
            position: { x: geometry.x, y: (geometry.y - this.scrollValue.__getValue()) },
            opacity: 1,
            currentTodo: todo
        });

    }

    handleModalClose = () => {
        this.setState({
            showModal: false,
            geometry: null,
            position: 0,
            opacity: 0,
            scale: 0.5,
            currentTodo: null
        });
    }

    renderTodoItem = () => {

        const { todos } = this.props;

        if (todos && todos.length > 0) {

            const count = todos.length;

            return todos.map((t, i) => {
                return <Note key={i} todo={t} lastItem={count == (i + 1)} openModal={this.openModal} />
            })

        } else {
            return <View style={styles.todo}><Text>Nothing to do</Text></View>
        }

    }

    render() {

        let { currentTodo, showModal, geometry, position, opacity, scale } = this.state;

        let handleScroll = Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollValue } } },
        ])

        return (
            <View style={styles.container}>

                <ScrollView
                    style={styles.scrollContainer}
                    scrollEventThrottle={16}
                    keyboardDismissMode="on-drag"
                    onScroll={handleScroll}>
                    {this.renderTodoItem()}
                </ScrollView>

                {
                    showModal ?
                        <Popover
                            width={geometry.w}
                            scale={scale}
                            opacity={opacity}
                            position={position}
                            handleClose={this.handleModalClose} >
                            <Text style={{ fontSize: 18 }}>{currentTodo.todo}</Text>
                            <Text style={{ fontSize: 14 }}>{helpers.getTimeRemaining(currentTodo.end)}</Text>
                        </Popover> : null
                }

                <ButtonWithInput
                    onPress={this.addTodo}
                    onChangeText={this.handleChangeText}
                    fieldText={this.state.todoText}
                />

            </View>
        );
    }
}

const styles = ES.create({
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
    scrollContainer: {
        flex: 1,
    }
});

TodoList.propTypes = {
    todos: PropTypes.array
}

TodoList.defaultProps = {
    todos: []
}


const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);