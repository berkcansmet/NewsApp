//import liraries
import axios from "axios";
import { Container, Tab, Tabs, ScrollableTab } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import CategoriesTab from "./CategoriesTab";
// create a component
class CategoriesName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      img:null,
    };

    this.getReqestAxios();
  }

  async getReqestAxios() {
    try {
      await axios
        .get
          ("http://bomba32isdunyasi.com/wp-json/wp/v2/posts?categories=151")
        .then(async res => {
           
          this.setState({
            name: res.data,
          })
             this.getImage();
      })
        .catch(async err => {
          console.warn(err);
        });
    } catch (error) {
      console.error(error);
    }
  }
  getImage = async () => {
    axios
      .get
      ("http://bomba32isdunyasi.com/wp-json/wp/v2/media?parent=8856")
      .then(async res => {
        this.setState({
          img: res.data,
        });
      });
  };


  renderName = () => {
    var name = this.state.name;
    var img = this.state.img;
    if (name && img) {
      return name.map((data, index) => {
        console.log("IMg", img);
        return (
          <CategoriesTab
            key={index}
            id={data.id}
            detail={data.content.rendered}
            title={data.title.rendered}
            date={data.date}
          />
        );
      });
    }
  };
  render() {
    return (
      <Container>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading={this.props.tabsname}>
          <CategoriesTab> {this.renderName()}</CategoriesTab>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

//make this component available to the app
export default CategoriesName;