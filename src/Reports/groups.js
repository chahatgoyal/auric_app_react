import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar, TouchableNativeFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Grid, Col, Spinner } from 'native-base';
import { withNavigationFocus, createStackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { USER_KEY } from "../../auth";
import axios from 'axios';
import { base_url } from "../../base_url";

class Groups extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Groups",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        ),
        headerStyle:{
            backgroundColor: "#cd9930",
            color:"#fff"
        },
        headerTitleStyle:{
            color:"#fff"
        }
    })

    constructor(props){
        super(props);
        this.state = {
            data: [],
            busy: true
        }
    }

    componentDidMount(){
        this.fetch();
    }

    async fetch(){
        let token = null;
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));
        await axios.get(base_url + '/api/group/', {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then((res)=>{
            let data = res.data;
            console.log(data)
            this.setState({
                data: data,
                busy: false,
            })
          })
          .catch((err)=>{
            console.log('error', err);
          });
    }
    render() {
        if(this.state.busy)
            return(
                    <View style={Styles.loadingContainer}>
                        <Spinner color="#cd9930" />
                    </View>
                )
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <Content>
                    {this.state.data.map(item=>(
                        <TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate('TabNavigator', {filter:'group', group: item.pk})}}>
                            <Card button key={this.state.data.indexOf(item)}>
                                <CardItem header>
                                  <Text>{item.group}</Text>
                                </CardItem> 
                              </Card>
                        </TouchableNativeFeedback>
                        ))}
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(Groups);
