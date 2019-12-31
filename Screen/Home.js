//import liraries
import axios from "axios";
import {
  Container,
  Content,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import React, { Component, createRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import MaterialTabs from "react-native-material-tabs";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import ScalingDrawer from "react-native-scaling-drawer";
import Headline from "../Components/Headline";
import LeftMenu from "../Components/LeftMenu";
import PageHeader from "../Components/PageHeader";
import { Fonts } from "../Helpers/Fonts";
import NetInfo from "@react-native-community/netinfo";

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
      newsimg: [],
      categoryArr: [],
      modalVisible: false,
      netAlert: false,
      isLoding: true,
    };

    this.getReqestAxios();
    this.getRequestAxios2();
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == false) {
        this.setState({ netAlert: true });
      } else {
        this.setState({ netAlert: false });
      }
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
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
          newsimg: [],
        });

        this.getNewsImg();
        console.log("berkcan", res.data[0].id);
      });
  };
  getNewsImg = async () => {
    if (this.state.categoriesnews) {
      for (var i = 0; i < this.state.categoriesnews.length; i++) {
        axios
          .get(
            "http://bomba32isdunyasi.com/wp-json/wp/v2/media?parent=" +
              this.state.categoriesnews[i].id
          )
          .then(async res => {
            this.setState({
              newsimg: [...this.state.newsimg, res.data],
            });
            console.log("123132", res.data);
          });
      }
    }
  };

  renderCategoriesNews = () => {
    var categoriesnews = this.state.categoriesnews;
    var newsimg = this.state.newsimg;
    if (categoriesnews && newsimg.length == categoriesnews.length) {
      console.log("eftal", newsimg);
      return categoriesnews.map((data, index) => {
        console.log("HABER", data.title.rendered);
        console.log("resim", newsimg[0]);
        return (
          <TouchableOpacity
            onPress={() =>
              Actions.Detail({
                id: data.id,
                title: data.title.rendered,
                img: newsimg[index][0].source_url,
                detail: data.content.rendered,
                date: data.date,
              })}
          >
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  square
                  source={{ uri: newsimg[index][0].source_url }}
                />
              </Left>
              <Body>
                <Text>{data.title.rendered}</Text>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() =>
                    Actions.Detail({
                      id: data.id,
                      title: data.title.rendered,
                      img: newsimg[index][0].source_url,
                      detail: data.content.rendered,
                      date: data.date,
                    })}
                >
                  <Text>D E T A Y</Text>
                </Button>
              </Right>
            </ListItem>
          </TouchableOpacity>
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
              <Modal
                animationType="slide"
                transparent={true}
                isVisible={this.state.netAlert}
              >
                <View style={styles.modal}>
                  <Text style={styles.modaltext}> BAĞLANTI HATASI </Text>
                  <Text style={styles.modaltext2}>
                    İnternet Bağlatınızı kontrol ediniz !
                  </Text>
                  <Text style={styles.modaltext2}>
                    Bağlatınızı sağladıktan sonra tekrar giriş yapabilirsiniz.
                  </Text>
                </View>
                <View>
                  <Button full dark onPress={() => BackHandler.exitApp()}>
                    <Text style={styles.buttontext}>T A M A M</Text>
                  </Button>
                </View>
              </Modal>
            </View>
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
  modal: {
    backgroundColor: "#DAD9D9",
    width: "100%",
    height: Dimensions.get("window").height / 4,
  },
  modaltext: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "center",
    fontFamily: Fonts.Bold,
  },
  modaltext2: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    fontFamily: Fonts.Regular,
  },
  buttontext: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: Fonts.Bold,
    color: "white",
  },
});

//make this component available to the app
export default Home;
