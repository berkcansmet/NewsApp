//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Fonts } from "../Helpers/Fonts";

// create a component
class Headline extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.Detail({
            id: this.props.id,
            title: this.props.title,
            img: this.props.img,
            detail: this.props.detail,
            date: this.props.date,
          })}
      >
        <ImageBackground
          style={styles.ImageBackground}
          source={{ uri: this.props.img }}
        >
          <View style={styles.Headline}>
            <Text style={styles.Text}>{this.props.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  ImageBackground: {
    marginHorizontal: 5,
    width: Dimensions.get("window").width,
    height: 200,
    borderRadius: 60,
  },
  Headline: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 200,
    flex: 1,
    backgroundColor: "transparent",
    color: "white",
  },
  Text: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    fontFamily: Fonts.Bold,
  },
});

//make this component available to the app
export default Headline;
