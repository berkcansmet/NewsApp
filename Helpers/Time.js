//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';
// create a component
class Time extends Component {
    constructor(props){
        super(props);
        this.date = props.time;
    }
    render() {
        const time = Moment( this.date ).format(" MMMM Do YYYY, h:mm:ss a");
        return (
            <Text>{time}</Text>
        );
    }
}

export default Time;
