//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Container, Content,ScrollView } from 'react-native';
import axios from 'axios';
import PageHeader from '../Components/PageHeader';
import Headline from '../Components/Headline';

// create a component
class Home extends Component {


    constructor(props){
        super(props);
        this.state = {
            headline: null,
            img: null,
        }

        this.getReqestAxios()
        
    }

    async getReqestAxios(){
        try{
            await axios.get('http://bomba32isdunyasi.com/wp-json/wp/v2/posts').then(async(res) =>{
                this.setState({
                    
                    headline: res.data
                    
               })
               
                for (var i = 0; i < this.state.headline.length; i++){
                console.log("State", this.state.headline[i])
                }
                
            })
            
             .catch(async(err) => {
                console.warn(err);
            })
        
            
        } catch (error) {
            console.error(error);
        }
        }

        renderHeadline = () => {
            var headline = this.state.headline;
                if ( headline ) {
                    return headline.map((data,index) => {
                        
                        return(               
                            <Headline id={data.id} detail={data.content.rendered} title={data.title.rendered} img={data.guid.rendered} date={data.date}/>
                        ) 
                    })
                }
            
    };
    
    
    render() {
        return (
            <View style={styles.container}>
                    <PageHeader/>
                    <View>
                <ScrollView horizontal={true} showHorizontalIndicator={false}>
                   
                     
                  {this.renderHeadline()} 
                  
                  
                    
                   
                </ScrollView>
                </View>
                </View>
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    
});

//make this component available to the app
export default Home;
