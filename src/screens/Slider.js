import React, { Component } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import ES from 'react-native-extended-stylesheet'


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


export default class Projects extends Component {

    constructor(props) {
        super(props)

        this.state = {
            entries: [
                {
                    title: 'Beautiful and dramatic Antelope Canyon',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/UYiroysl.jpg'
                },
                {
                    title: 'Earlier this morning, NYC',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
                },
                {
                    title: 'White Pocket Sunset',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
                },
                {
                    title: 'Acrocorinth, Greece',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
                },
                {
                    title: 'The lone tree, majestic landscape of New Zealand',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
                },
                {
                    title: 'Middle Earth, Germany',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/lceHsT6l.jpg'
                }
            ],
            slider1ActiveSlide: 0
        }
    }

    renderItem({ item, index }) {
        return (
            <View style={styles.slide}>

                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    <Image
                        source={{ uri: item.illustration }}
                        style={styles.image}
                    />
                    <View style={[styles.radiusMask]} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title.toUpperCase()}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
            </View>

        );
    }

    render() {



        return (

            <View>

                <Carousel
                    layout={'default'}
                    ref={c => { this._carousel = c }}
                    data={this.state.entries}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.80}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    firstItem={this.state.slider1ActiveSlide}

                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                    activeAnimationType={'spring'}

                />

                <Pagination
                    dotsLength={this.state.entries.length}
                    activeDotIndex={this.state.slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={'#000'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />

            </View>
        )


    }

}


const styles = ES.create({
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },


    container: {
        flex: 1,
    },
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
    imageContainer: {
        flex: 1,
        marginBottom: 0, // Prevent a random Android rendering issue
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


    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - 8,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    title: {
        color: '#000',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    subtitle: {
        marginTop: 6,
        color: '#000',
        fontSize: 12,
        fontStyle: 'italic'
    },

})
