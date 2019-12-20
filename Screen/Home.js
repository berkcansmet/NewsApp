//import liraries
import axios from "axios";
import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Container, Content} from 'native-base';
import Headline from "../Components/Headline";
import PageHeader from "../Components/PageHeader";
import CategoriesName from "../Categories/CategoriesName";

// create a component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: null,
      images: null,
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
async getRequestAxios2(){
        try{
            await axios.get('http://bomba32isdunyasi.com/wp-json/wp/v2/categories').then(async(res) => {
               this.setState({
                   tabsname : res.data
               })
                for (var i = 0; i < this.state.tabsname.length; i++){
               console.log("Tabs Name", this.state.tabsname[i])
                }
            })
            .catch(async(err) => {
                console.warn(err);
            })
        
            
        } catch (error) {
            console.error(error);
        }

    }

    renderTabsname = () => {
        var tabsname = this.state.tabsname;
        if ( tabsname ) {
            return tabsname.map((data,index) => {
                return (
                    <CategoriesName id={data.id} name={data.name} />
                    
                )
            })
        }
    }
  render() {
    return (
      <Container style={styles.container}>
      <Content>  
        <PageHeader />
        <View>
          <ScrollView horizontal={true} showHorizontalIndicator={false}>
            {this.renderHeadline()}
          </ScrollView>
        </View>
        <View>
         <ScrollView horizontal={true}>
          {this.renderTabsname()}
            </ScrollView>
        </View>
         </Content>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default Home;
