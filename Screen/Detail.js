//import liraries
import { Right } from "native-base";
import { Content } from "native-base";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";
import HTMLView from "react-native-htmlview";
import Icon from "react-native-vector-icons/FontAwesome";
import TopHeader from "../Components/TopHeader";
import Time from "../Helpers/Time";
import Comment from "./Comment"

// create a component
class Detay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      alreadyBookmark: false,
    };
    console.log("DETAIL", this.props.img);
  }
  likeImage = async () => {
    const likeState = await !this.state.liked;
    this.setState({ liked: likeState });
    console.log("berkcannnn",likeState )
  };

  render() {
    const { liked } = this.state;
    const colorValue = liked ? "black" : "#EEEDED";

    return (
      <View style={styles.container}>
        <TopHeader title={this.props.title} />

        <Image style={styles.image} source={{ uri: this.props.img }} />
        <Content style={{ marginHorizontal: 10 }}>
          <View style={styles.icon}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="calendar" size={30} />
              <Time time={this.props.date} />
            </View>
             <TouchableOpacity onPress={()=> Actions.Comment() }>
            <View>
             <Icon name="commenting-o" size={30} color="grey"/>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.likeImage, this.saveData }>
              <Right>
                <Icon name="bookmark" size={40} color={colorValue} />
              </Right>
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView>
              <HTMLView value={this.props.detail} />
            </ScrollView>
          </View>
        </Content>
      </View>
    );
  }
  saveData(){
    aler("test")
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 500,
    resizeMode: "cover",
  },
  icon: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
  },
});

//make this component available to the app
export default Detay;
