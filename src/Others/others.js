import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Spinner } from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';
import {base_url} from "../../base_url";

class Others extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Others",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={20} style={{color:"#fff"}}/>
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
            busy: true,
        }
    }

    componentDidUpdate(prevProps) {
        console.log('try')
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.setState({busy:true},()=>{
            this.fetch();
          })
        }
      }

    componentDidMount(){
        this.fetch();
    }

    async fetch(){
        let token = null
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));
        await axios.get(base_url + '/api/form/', {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then(async (res)=>{
            let data = res.data;
            console.log(data)
            if(data.length > 0){
                for(var i=0; i<data.length; i++){
                    await axios.get(data[i].user,{
                        headers: {
                        Authorization: 'Token ' + token //the token is a variable which holds the token
                        },
                    })
                    .then(res=>{
                        console.log(data, i)
                        data[i].user = res.data;
                    }).catch(err=>{
                        console.log(err);
                    })

                    await axios.get(data[i].location,{
                        headers: {
                        Authorization: 'Token ' + token //the token is a variable which holds the token
                        },
                    })
                    .then(res=>{
                        console.log(data, i)
                        data[i].location = res.data;
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            }
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
                  {
                    this.state.data.map(item=>{
                        return(
                                <Card button onPress={()=> alert("yipiee")} key={this.state.data.indexOf(item)}>
                                    <CardItem header style={{paddingBottom: 0}}>
                                      <Text>{item.user.name}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>
                                              Sales:- {item.sales}
                                            </Text>
                                            <Text>
                                              ( {item.location.location} )
                                            </Text>
                                        </Left>
                                    </CardItem>
                                </Card>
                            )
                    })
                  }
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(Others);
