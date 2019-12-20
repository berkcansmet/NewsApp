//import liraries
import { Header, Right, Left, Body } from "native-base";
import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Actions} from 'react-native-router-flux'
// create a component
class TopHeader extends Component {
  render() {
    return (
      <Header style={styles.container}>
        <Left>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={styles.text } numberOfLines={1} >{this.props.title}</Text>
          
        </Body>
        <Right />
      </Header>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
      fontSize: 15,
      color: '#fff',
      textAlign: 'center'
  }
});

//make this component available to the app
export default TopHeader;
