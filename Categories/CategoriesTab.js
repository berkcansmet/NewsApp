import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Fonts } from "../Helpers/Fonts";

class CategoriesTab extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.ImageBackground}
        source={{ uri: this.props.img }}
      >
        <View style={styles.Headline}>
          <Text style={styles.Text}>berkcan</Text>
        </View>
      </ImageBackground>
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

export default CategoriesTab;
