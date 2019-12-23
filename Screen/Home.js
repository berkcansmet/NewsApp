//import liraries
import axios from "axios";
import { Container, Content } from "native-base";
import React, { Component , createRef} from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScalingDrawer from 'react-native-scaling-drawer';
import CategoriesName from "../Categories/CategoriesName";
import Headline from "../Components/Headline";
import LeftMenu from "../Components/LeftMenu";
import PageHeader from "../Components/PageHeader";
export const drawer = createRef();
const defaultScalingDrawerConfig = {
  scalingFactor: 0.7,
  minimizeFactor: 0.7,
  swipeOffset: 20
};
// create a component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: null,
      detail: null,
      tabsname: null,
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
        console.log("IMAGES", images);
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
            tabsname: res.data,
          });
          console.log("TABSNAME", this.state.tabsname);
           this.getDetail();
        })
        .catch(async err => {
          console.warn(err);
        });
    } catch (error) {
      console.error(error);
    }
  }

   getDetail = async () => {
    axios
      .get
      ("http://bomba32isdunyasi.com/wp-json/wp/v2/posts?categories")
      .then(async res => {
        this.setState({
          detail: res.data,
        });
        console.log("DETAİL", this.state.detail);
      });
  };
  renderTabsname = () => {
    var tabsname = this.state.tabsname;
    var detail = this.state.detail;
    if (tabsname && detail) {
      return tabsname.map((data, index) => {
        return <CategoriesName key={index} tabsnameid={data.id} tabsname ={data.name} />;
      });
    }
  };
  render() {
    return (
       <ScalingDrawer
        ref={drawer}
        content={<LeftMenu drawer={drawer} />}
        {...defaultScalingDrawerConfig}
        onClose={() => console.log('close')}
        onOpen={() => console.log('open')}
      >
      <Container style={styles.container}>
        <Content>
          <PageHeader openDrawer={()  => drawer.current.open() } />
          <View>
            <ScrollView horizontal={true} showHorizontalIndicator={false}>
              {this.renderHeadline()}
            </ScrollView>
          </View>
          <View>
            <ScrollView horizontal={true}>{this.renderTabsname()}</ScrollView>
          </View>
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
});

//make this component available to the app
export default Home;