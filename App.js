//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Home from './Screen/Home';
import PageHeader from './Components/PageHeader';
import Detail from './Screen/Detail'
// create a component
class App extends Component {
  render() {
    return (
      <Router>
      
        <Stack key='root'>
          <Scene key = 'Home'
          component = {Home}
          title = 'Home'
          hideNavBar
          />
         <Scene key = 'Detail'
          component = {Detail}
          title = 'Detail'
          hideNavBar
          />
        </Stack>
      </Router>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
