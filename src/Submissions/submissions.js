import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, TouchableNativeFeedback, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left, Spinner} from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import { base_url } from "../../base_url";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';

class Submissions extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "My Submissions",
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
            busy_mid: false,
        }
    }

    componentDidUpdate(prevProps) {
        console.log('try')
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.setState({busy_mid:true},()=>{
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
        await axios.get(base_url + '/api/form/?onlyMy=true', {
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
                        data[i].location = res.data;
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            }
            this.setState({
                data: data,
                busy: false,
                busy_mid: false
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
        if(this.state.data.length === 0){
            return(
                    <Container style={Styles.container}>
                        <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <Text 
                                onPress={()=>this.props.navigation.navigate('SubmitForm')} 
                                style={Styles.noData}>
                                There are no submissions for today! Click here to submit.
                            </Text>
                        </View>
                    </Container>
                )
        }
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                { 
                    this.state.busy_mid && 
                        <Spinner color="#cd9930" />
                }
                <Content>
                  {
                    this.state.data.map(item=>{
                        return(
                                <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('EditSubmission', {data: item})} key={this.state.data.indexOf(item)}>
                                    <Card>
                                        <CardItem header style={{paddingBottom: 0}}>
                                          <Text>
                                              {item.location.location}
                                          </Text>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Text>
                                                  Sales:- {item.sales}
                                                </Text>
                                            </Left>
                                            <Right>
                                                <Icon name="edit" style={{color:"#d0a44c", fontSize:20}}/>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </TouchableNativeFeedback>
                            )
                    })
                  }
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(Submissions);
