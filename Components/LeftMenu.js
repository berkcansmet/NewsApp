import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Icon,Thumbnail } from 'native-base';
import {Actions} from 'react-native-router-flux'

class LeftMenu extends Component {
    render() {
        return (
            <Content style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => Actions.Profil()}>
                        <Thumbnail style={styles.thumbnail}
                            source={{ uri: 'https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=545&q=80' }}
                            large
                        />
                    </TouchableOpacity>
                    <Text style={styles.Text1}>Hİ !</Text>
                </View>
                 <Content>
          <List>
            <ListItem selected>
              <TouchableOpacity>
                <Text style={styles.Text}>Bookmark</Text>
              </TouchableOpacity>
            </ListItem>
          </List>  
          <List>
            <ListItem selected>
                <TouchableOpacity>
                <Text style={styles.Text}>News</Text>
              </TouchableOpacity>
            </ListItem>
          </List>  
          <List>
            <ListItem selected>
              <TouchableOpacity>
                <Text style={styles.Text}>About</Text>
              </TouchableOpacity>
            </ListItem>
          </List>  
        </Content>
            </Content>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },

    Text:{
        fontSize:17,
        color:'#000000',

    },
    header:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff',
    },
    thumbnail:{
        margin: 20,
    },
    Text1:{
        fontSize:20,
        color:'#000000',
    }
});


export default LeftMenu;
