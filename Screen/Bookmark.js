//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopHeader from '../Components/TopHeader';
import AsyncStorage from '@react-native-community/async-storage';
class Bookmark extends Component {
    render() {
        return (
            <View style={styles.container}>
            <TopHeader/>
                <Text>Bookmark</Text>
            </View>
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
});

//make this component available to the app
export default Bookmark;
