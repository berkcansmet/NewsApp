//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import {Header,Left, Body, Right,Input, Item, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
// create a component
class PageHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                     <TouchableOpacity>
                     <Icon name='bars' size={20}/>
                     </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.text}>Berkcan News App</Text>
                </View>
                
                <View style={styles.ıcon}>
                    <View>
                        <TouchableOpacity>
                        <Icon name='bell-o' size={20}/>
                        </TouchableOpacity>
                    </View>
                    <View>    
                        <TouchableOpacity>
                        <Icon name='search' size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        
        width:Dimensions.get('window').width,
        paddingTop:30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        backgroundColor: 'white',
        borderBottomColor:'black',
        borderBottomWidth: 1
    },
    
    ıcon:{
        
        flexDirection:'row',
        
    },
    text:{
        fontSize:20,
        
    }
  
      
});

//make this component available to the app
export default PageHeader;
