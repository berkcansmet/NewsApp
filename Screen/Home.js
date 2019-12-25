//import liraries
import axios from "axios";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import React, { Component, createRef } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import MaterialTabs from "react-native-material-tabs";
import ScalingDrawer from "react-native-scaling-drawer";
import Headline from "../Components/Headline";
import LeftMenu from "../Components/LeftMenu";
import PageHeader from "../Components/PageHeader";

export const drawer = createRef();
const defaultScalingDrawerConfig = {
  scalingFactor: 0.7,
  minimizeFactor: 0.7,
  swipeOffset: 20,
};
// create a component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: null,
      detail: null,
      categories: null,
      categoriesitemname2: null,
      categoriesnews: null,
      selectedIndex: 0,
      categoryArr: [],
    };

    this.getReqestAxios();
    this.getRequestAxios2();
  }

  async getReqestAxios() {
    try {
      await axios
        .get("http://bomba32isdunyasi.com/wp-json/wp/v2/posts")
        .then(async res => {
          this.setState({
            headline: res.data,
          });
          this.getMedias();
        })
        .catch(async err => {
          console.warn(err);
        });
    } catch (error) {
      console.error(error);
    }
  }

  getMedias = async () => {
    axios
      .get("http://bomba32isdunyasi.com/wp-json/wp/v2/media")
      .then(async res => {
        this.setState({
          images: res.data,
        });
      });
  };

  renderHeadline = () => {
    var headline = this.state.headline;
    var images = this.state.images;
    if (headline && images) {
      return headline.map((data, index) => {
        //console.log("IMAGES", images);
        return (
          <Headline
            key={index}
            id={data.id}
            img={images[index].source_url}
            detail={data.content.rendered}
            title={data.title.rendered}
            date={data.date}
          />
        );
      });
    }
  };
  async getRequestAxios2() {
    try {
      await axios
        .get("http://bomba32isdunyasi.com/wp-json/wp/v2/categories")
        .then(async res => {
          this.setState({
            categories: res.data,
          });
          console.log("Cat", this.state.categories);
          this.getCategoriesNews(res.data[0].id);
        })
        .catch(async err => {
          console.warn(err);
        });
      if (this.state.categories) {
        this.state.categories.map((data, index) => {
          this.setState({
            categoryArr: [...this.state.categoryArr, data.name],
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  getCategoriesNews = async cat_id => {
    axios
      .get(
        "http://bomba32isdunyasi.com/wp-json/wp/v2/posts?categories=" + cat_id
      )
      .then(async res => {
        this.setState({
          categoriesnews: res.data,
        });
        this.getNewsImg(res.data[0].id);
        console.log("berkcan", data[0].id);
      });
  };
  getNewsImg = async kat_id => {
    axios
      .get("http://bomba32isdunyasi.com/wp-json/wp/v2/posts?parent=" + kat_id)
      .then(async res => {
        this.setState({
          newsimg: res.data,
        });
      });
  };

  renderCategoriesNews = () => {
    var categoriesnews = this.state.categoriesnews;
    var newsimg = this.state.newsimg;
    if (categoriesnews && newsimg) {
      return categoriesnews.map((data, index) => {
        console.log("HABER", data.title.rendered);
        console.log("resim", newsimg);
        return (
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: data.source_url }} />
              </Left>
              <Body>
                <Text>{data.title.rendered}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>D E T A Y</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        );
      });
    }
  };

  onChangeCat = index => {
    this.setState({
      selectedIndex: index,
    });
    var catid = this.state.categories[index].id;
    this.getCategoriesNews(catid);
    var katid = this.state.newsimg[index].id;
    this.getNewsImg(katid);
  };

  render() {
    return (
      <ScalingDrawer
        ref={drawer}
        content={<LeftMenu drawer={drawer} />}
        {...defaultScalingDrawerConfig}
        onClose={() => console.log("close")}
        onOpen={() => console.log("open")}
      >
        <Container style={styles.container}>
          <Content>
            <PageHeader openDrawer={() => drawer.current.open()} />
            <View>
              <ScrollView horizontal={true} showHorizontalIndicator={false}>
                {this.renderHeadline()}
              </ScrollView>
            </View>
            {this.state.categoryArr.length > 0 && (
              <MaterialTabs
                items={this.state.categoryArr}
                selectedIndex={this.state.selectedIndex}
                onChange={index => this.onChangeCat(index)}
                barColor="#1fbcd2"
                indicatorColor="#fffe94"
                activeTextColor="white"
                scrollable={true}
              />
            )}
            {this.renderCategoriesNews()}
          </Content>
        </Container>
      </ScalingDrawer>
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
  tab: {
    justifyContent: "space-between",
  },
});

//make this component available to the app
export default Home;
