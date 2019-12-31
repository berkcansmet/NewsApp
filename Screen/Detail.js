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
} from "react-native";
import HTMLView from "react-native-htmlview";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import TopHeader from "../Components/TopHeader";
import Time from "../Helpers/Time";
import Comment from "./Comment";
import AsyncStorage from "@react-native-community/async-storage";

// create a component
class Detay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      alreadyBookmark: false,
      bookmarks: [],
    };
    console.log("DETAIL", this.props.img);
  }

  componentWillMount = async () => {
  //  await AsyncStorage.removeItem("bookmarks");
  };

  likeImage = async post_id => {
    const likeState = await !this.state.liked;
    this.setState({ liked: likeState });
    console.log("berkcannnn", likeState);
    this.setState({ likeState: true });
    if ((await AsyncStorage.getItem("bookmarks")) == null) {
      AsyncStorage.setItem("bookmarks", JSON.stringify([post_id]));
    } else {
      var bookmarks = JSON.parse(await AsyncStorage.getItem("bookmarks"));
      if(bookmarks !== post_id){
      bookmarks.push(post_id);
      } 
      AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    console.log(await AsyncStorage.getItem("bookmarks"));
  };

  render() {
    const { liked } = this.state;
    const ıconValue = liked ? "bookmark" : "bookmark-o";

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
            <TouchableOpacity onPress={() => Actions.Comment()}>
              <View>
                <Icon name="commenting-o" size={30} color="grey" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.likeImage(this.props.id)}>
              <Right>
                <Icon name={ıconValue} size={40} />
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
