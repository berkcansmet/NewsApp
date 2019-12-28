//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Header, Body,Left, Right,Button,TouchableOpacity,Container} from 'native-base';
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

// create a component
class Comment extends Component {
    render() {
        return (
            <Container style={styles.container}>
            <Header style= {styles.header}>
                <Left>
                <Icon name="chevron-left" size={20}/>
                </Left>
                <Body>
                <Text>
                Comments
                </Text>
                </Body>
                <Right>
                <Icon name="plus-square-o" size={20}/>
                </Right>
            </Header>
            <View>
            <Text>
            </Text>
            </View>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header:{
   width: "100%",
   backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Comment;
