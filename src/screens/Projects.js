import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
    AsyncStorage,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

import { Container } from '../components/Container'
import { ButtonWithInput } from "../components/Button";

import Carousel, { Pagination } from 'react-native-snap-carousel'
import ES from 'react-native-extended-stylesheet'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions";


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.70;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(1);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;


class Projects extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            activeSlide: 0
        }
    }

    componentWillMount() {

        // AsyncStorage.removeItem('rnproject');
        this.props.fetchProjects()

    }

    renderItem({ item, index }) {
        return (
            <View style={styles.slide}>

                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                    <View style={[styles.radiusMask]} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                </View>
            </View>

        );
    }


    handleAddProject = (text) => {

        if (text == '') return;

        const d = new Date();
        const id = d.getTime();

        this.props.addProject(id, text, [], 'https://i.imgur.com/KZsmUi2l.jpg');


        const _this = this

        setTimeout(() => {
            _this._carousel.snapToItem(_this.props.projects.length, true);
        }, 600)

    }

    render() {


        // alert(JSON.stringify(this.props, null, 4))

        return (

            <Container bgColor="white">

                <Carousel
                    layout={'default'}
                    ref={c => { this._carousel = c }}
                    data={this.props.projects}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.8}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    firstItem={this.state.activeSlide}

                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}

                    enableMomentum={true}
                    decelerationRate={0.9}
                    activeAnimationType={'timing'}

                />

                <Pagination
                    dotsLength={this.props.projects.length}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={'#000'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />

                <ButtonWithInput
                    placeholder="Add Project"
                    onPress={this.handleAddProject}
                />

            </Container>
        )

    }

}

Projects.propTypes = {
    projects: PropTypes.array
}

Projects.defaultProps = {
    projects: []
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)


const styles = ES.create({

    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    slide: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: 0,
        paddingBottom: 18, // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: 8
    },


    // Image
    imageContainer: {
        flex: 1,
        marginBottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    imageContainerEven: {
        backgroundColor: '#000'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },


    // Text
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - 8,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'black',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    title: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },

    // Pagination
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },



})
