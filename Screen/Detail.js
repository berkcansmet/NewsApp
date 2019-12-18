//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,Dimensions, TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// create a component
class Detay extends Component {
    state = {
		liked: false,
	}
	likeImage = async () => {
		const likeState = await !this.state.liked
		this.setState({ liked: likeState }) 
       } 

    render() {
        const { liked } = this.state
		const colorValue = liked ? 'blue' : 'black'

        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.image}></Image>
                </View>
                <View style={styles.icon}>
                    <Icon name='calendar' size={30} />
                    <Text>{this.props.date}</Text>
                </View>
                <TouchableOpacity onPress={this.likeImage} >
                    <View>
                        <Icon name='save' size={30}  color={colorValue}/>
                    </View> 
                </TouchableOpacity>        
                    <Text>{this.props.detail}</Text>
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
    image:{
        height:'100%',
        width:Dimensions.get('window').width,
        backgroundColor:'red'
    },
    icon:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row',
        
        
    },
});

//make this component available to the app
export default Detay;
