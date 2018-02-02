import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, 
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  UIManager,
  Animated,
  Dimensions
} from 'react-native';

import Note from './Note';


export default class Main extends Component<{}> {

    constructor(props) {
        super(props)

        this.scrollValue = new Animated.Value(0)

        const { width, height } = Dimensions.get('window');
        const edgeLength = 100;
        const axisX = (width / 2) - (edgeLength / 2);
        const axisY = (height / 2) - (edgeLength / 2);

        this.state = {
            noteArray: [],
            noteText: '',
            noteItemMeasure: null,
            panAnimation: new Animated.ValueXY({ x: axisX , y: axisY }),
            scaleAnimation: new Animated.Value(30),
        }
    }

    componentDidMount(){

        this.fetchData();
    }

    saveDate = () => {

        const { noteArray } = this.state;

        AsyncStorage.setItem('rntodo', JSON.stringify(noteArray));

    }

    fetchData = async () => {

        try {
            
            let notes = await AsyncStorage.getItem('rntodo');

            notes = JSON.parse(notes);

            this.setState({
                noteArray: notes
            })

        } catch (error) {
            alert(error)
        }

    }

    handleChangeText = (text) => {
        this.setState({
            noteText : text
        })
    }

    addNote = () => {

        if( this.state.noteText == '' ) return;

        const d = new Date();
        const newNotes = this.state.noteArray;

        newNotes.push({
            date: d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate(),
            note: this.state.noteText
        })

        this.setState({
            noteArray: newNotes,
            noteText: ''
        }, () => this.saveDate() );

    }

    deleteNote = ( index ) => {

        let newNotes = this.state.noteArray;

        newNotes.splice( index , 1);

        this.setState({
            noteArray: newNotes
        }, () => this.saveDate() )

    }
    
    measureNode = (node) => {
        return new Promise( (resolve, reject) => {
            UIManager.measureLayoutRelativeToParent(
                node,
                (e) => reject(e),
                (x, y, w, h) => {
                    resolve({x, y, w, h });
                }
            )
        } )
    }

    editNote = (dimension) => {

        let {scaleAnimation} = this.state;

        this.setState({noteItemMeasure: dimension }, ()=> {

            Animated.spring(
                scaleAnimation, {
                  toValue: 100,
                  friction: 3
                }
              ).start();

        });



    }

    render() {

        let notes = this.state.noteArray.map( (v, k) => {
            return <Note key={k} keyval={k} val={v} 
                        handleDelete={ () => { this.deleteNote(k) } } 
                        handleEdit={ this.editNote } 
                    />
        })

        let {noteItemMeasure, scaleAnimation} = this.state;

        let handleScroll = Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollValue}}},
        ])


        return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerText}>+</Text>
            </View>

            <ScrollView style={styles.scrollContainer} scrollEventThrottle={16} onScroll={handleScroll}>
                { notes }
            </ScrollView>

            {
                noteItemMeasure ? 
                <Animated.View style={{
                        position: 'absolute',
                        zIndex: 10,
                        width: noteItemMeasure.width,
                        height: scaleAnimation,
                        backgroundColor: 'blue',
                        transform: [{
                            translate: [ noteItemMeasure.x, noteItemMeasure.y - this.scrollValue.__getValue() ]
                        }]
                    }}></Animated.View> : null
            }

            <View style={styles.footer}>
                <TextInput
                    style={styles.TextInput}
                    value={this.state.noteText}
                    placeholder='Note'
                    placeholderTextColor='black'
                    underlineColorAndroid='transparent'
                    onChangeText={ this.handleChangeText }
                    onSubmitEditing={ this.addNote }
                ></TextInput>
            </View>

            <TouchableOpacity 
                style={styles.addButton}
                onPress={ this.addNote }
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
