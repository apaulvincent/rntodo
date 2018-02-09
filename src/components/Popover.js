import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  UIManager,
  Animated,
  findNodeHandle,
  Dimensions
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default class Popover extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    const { width, opacity, position, scale } = this.props;

    return (
      <Animated.View
        style={[
          {
            width: width,
            height: 200,
            opacity: opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [position.y, 200]
                })
              },
              {
                translateX: position.x
              },
              {
                scale: scale
              }
            ]
          },
          styles.container
        ]}
      >
        <TouchableOpacity onPress={this.handleClose} style={styles.close}>
          <Text>
            <Icon name="close" size={22} />
          </Text>
        </TouchableOpacity>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 6
  },
  close: {
    position: "absolute",
    zIndex: 1,
    right: 12,
    top: 12,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  }
});
