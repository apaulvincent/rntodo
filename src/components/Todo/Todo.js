import React, { Component } from "react";
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
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions";

import Icon from "react-native-vector-icons/MaterialIcons";
import measureNode from "../../helpers/measureNode";
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from "moment";

import { getTimeRemaining } from '../../helpers'

import styles from './styles';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPicker: false
        };
    }

    componentDidMount() {
        // Wierdo!
        // console.log(this.props.todo)
    }

    getDimension = async () => {
        const item = findNodeHandle(this.refs.itemWrap);

        try {

            let itemDimension = await measureNode(item);
            return itemDimension;

        } catch (err) {
            console.log(err);
        }
    };

    openModal = () => {

        this.getDimension().then(res => {
            this.props.openModal(res, this.props.todo);
        });

    };

    handleDelete = id => {
        this.props.deleteTodo(id);
    };


    showDatePicker = () => {
        this.setState({
            showPicker: true
        });
    }

    handleDatePicked = (date) => {

        const { todo } = this.props;

        this.props.updateTodo(todo.id, todo.todo, todo.date, date.getTime())

        this.handleCloseDatePicker();

    }

    handleCloseDatePicker = () => {
        this.setState({
            showPicker: false
        })
    }


    render() {
        const { todo } = this.props;

        const trunc =
            todo.todo.length < 20
                ? todo.todo
                : todo.todo.trim().substring(0, 20) + "...";


        const timeRemaining = getTimeRemaining(todo.end);
        const lastItemStyle = this.props.lastItem ? styles.lastItemStyle : null;

        return (
            <View key={todo.id} style={[styles.todo, lastItemStyle]} ref="itemWrap">
                <View style={styles.itemData}>
                    <Text style={styles.largeText}>
                        {trunc}
                    </Text>
                    <Text style={styles.smallText}>{timeRemaining}</Text>
                </View>

                <View style={styles.itemControls}>

                    {
                        timeRemaining == 'Lapsed' ?
                            <Text style={styles.noteLapsed}>
                                <Icon name="check-circle" size={24} />
                            </Text> : null
                    }

                    <TouchableOpacity onPress={this.showDatePicker}>
                        <Text style={styles.noteEdit}>
                            <Icon name="alarm" size={24} />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.openModal}>
                        <Text style={styles.noteEdit}>
                            <Icon name="create" size={24} />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.handleDelete(todo.id)}>
                        <Text style={styles.noteDelete}>
                            <Icon name="delete" size={24} />
                        </Text>
                    </TouchableOpacity>

                </View>

                <DateTimePicker // https://github.com/mmazzarolo/react-native-modal-datetime-picker
                    mode="datetime"
                    minimumDate={new Date()}
                    is24Hour={false}
                    isVisible={this.state.showPicker}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.handleCloseDatePicker}
                />

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
