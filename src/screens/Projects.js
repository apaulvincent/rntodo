import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
    AsyncStorage,
    ScrollView,
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

const slideHeight = viewportHeight * 0.30;
const slideWidth = wp(100);
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
                <View style={[styles.imageContainer]}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                    <View style={[styles.radiusMask]} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.name.toUpperCase()}</Text>
                    <ScrollView>
                        <Text style={styles.title}>Foobbkar</Text>
                    </ScrollView>
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

            <Container bgColor="black">

                <Carousel
                    layout={'default'}
                    ref={c => { this._carousel = c }}
                    data={this.props.projects}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    firstItem={this.state.activeSlide}

                    // autoplayDelay={500}
                    // autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}

                    enableMomentum={true}
                    decelerationRate={0.3}
                    activeAnimationType={'timing'}

                    enableSnap={true}

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
        paddingVertical: 0 // for custom animation
    },
    slider: {
        marginTop: 0,
        overflow: 'visible' // for custom animations
    },
    slide: {
        width: itemWidth,
        height: slideHeight,
    },

    // Image
    imageContainer: {
        flex: 1,
        marginBottom: 0,
        backgroundColor: 'white',
    },
    imageContainerEven: {
        backgroundColor: '#000'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },

    // Text
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - 8,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    title: {
        color: '#000',
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
