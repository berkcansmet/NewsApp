//import liraries
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Router, Stack, Scene } from "react-native-router-flux";
import Bookmark from "./Screen/Bookmark";
import Detail from "./Screen/Detail";
import Home from "./Screen/Home";
import Comment from "./Screen/Comment"
// create a component
class App extends Component {
  render() {
    console. disableYellowBox = true;
    return (
      <Router>
        <Stack key="root">
          <Scene key="Home" component={Home} title="Home" hideNavBar />
          <Scene key="Detail" component={Detail} title="Detail" hideNavBar />
          <Scene
            key="Bookmark"
            component={Bookmark}
            title="Bookmark"
            hideNavBar
          />
          <Scene
          key="Comment"
          component={Comment}
          title="Comment"
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default App;
