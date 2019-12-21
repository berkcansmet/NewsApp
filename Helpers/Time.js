//import liraries
import Moment from "moment";
import React, { Component } from "react";
import { Text } from "react-native";
// create a component
class Time extends Component {
  constructor(props) {
    super(props);
    this.date = props.time;
  }
  render() {
    const time = Moment(this.date).format(" MMMM Do YYYY, h:mm:ss a");
    return <Text>{time}</Text>;
  }
}

export default Time;
