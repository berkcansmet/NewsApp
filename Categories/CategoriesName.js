//import liraries
import React, { Component } from 'react';
import axios from "axios";
import {StyleSheet,Text} from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import CategoriesTab from './CategoriesTab';
// create a component
class CategoriesName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      images: null,
    };

    this.getReqestAxios();
  }

  async getReqestAxios() {
    try {
      await axios
        .get("http://bomba32isdunyasi.com/wp-json/wp/v2/posts?categories="+this.props.id)
        .then(async res => {
          this.setState({
            name: res.data,
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

  renderName= () => {
    var name = this.state.name;
    var images = this.state.images;
    if (name && images) {
      return name.map((data, index) => {
        console.log("IMAGES", images);
        return (
          <CategoriesTab
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
    render() {
        return (
            <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading={this.props.name}>
            <CategoriesTab>
             {this.renderName()}
            </CategoriesTab>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
});

//make this component available to the app
export default CategoriesName;
