import React, { Component } from 'react';
import {WebView, AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { Container, Content, Picker, Item, Form, Spinner, Button, Text } from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';
import {base_url} from "../../base_url";

class Download extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Download CSV",
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
            busy: false,
            busy2:false,
            month: '1',
            month2: '1',
            csv: null,
            flag: false
        }
    }

    async handleSubmit(){
        let token;
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));

        this.setState({busy:true},()=>{
            axios.get(base_url + `/api/download-reports/?month=${this.state.month}`, {
                headers: {
                Authorization: 'Token ' + token //the token is a variable which holds the token
                },
              })
              .then(async (res)=>{
                let data = res.data;
                this.setState({
                    csv: data.csvFile,
                    busy: false
                })
                Linking.canOpenURL(data.csvFile).then(supported => {
                      if (supported) {
                        Linking.openURL(data.csvFile);
                      } else {
                        console.log("Don't know how to open URI: " + data.csvFile);
                      }
                    });

              })
              .catch((err)=>{
                this.setState({busy:false})
                console.log('error', err);
              });
        })
    }


    async handleSubmit2(){
        let token;
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));

        this.setState({busy2:true},()=>{
            axios.get(base_url + `/api/download-customer-information/?month=${this.state.month2}`, {
                headers: {
                Authorization: 'Token ' + token //the token is a variable which holds the token
                },
              })
              .then(async (res)=>{
                let data = res.data;
                this.setState({
                    csv: data.csvFile,
                    busy2: false
                })
                Linking.canOpenURL(data.csvFile).then(supported => {
                      if (supported) {
                        Linking.openURL(data.csvFile);
                      } else {
                        console.log("Don't know how to open URI: " + data.csvFile);
                      }
                    });

              })
              .catch((err)=>{
                this.setState({busy2:false})
                console.log('error', err);
              });
        })
    }

    render() {
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <Content>
                <Text style={Styles.formLabel}>Download Reports</Text>
                <Form>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.month}
                        onValueChange={
                            (month)=>this.setState({month})
                        }
                      >
                        {
                            months.map(month=> <Picker.Item label={month.title} value={month.value} />)
                        }
                      </Picker>
                    </Item>
                </Form>
                <Button block disabled={this.state.busy} style={Styles.loginButton} onPress={() => { this.handleSubmit() }}>
                    <Text>Download Reports</Text>
                    {this.state.busy && <Spinner color="#fff" size={16}/>}
                </Button>
                <Text style={Styles.formLabel}>Download Customer Information</Text>
                <Form>
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.month2}
                        onValueChange={
                            (month2)=>this.setState({month2})
                        }
                      >
                        {
                            months.map(month=> <Picker.Item label={month.title} value={month.value} />)
                        }
                      </Picker>
                    </Item>
                </Form>
                <Button block disabled={this.state.busy2} style={Styles.loginButton} onPress={() => { this.handleSubmit2() }}>
                    <Text>Download Customer Information</Text>
                    {this.state.busy2 && <Spinner color="#fff" size={16}/>}
                </Button>
                </Content>
            </Container>
        );
    }
}

export default withNavigationFocus(Download);

const months = [
    {
        title: 'January',
        value: '1'
    },
    {
        title: 'February',
        value: '2'
    },
    {
        title: 'March',
        value: '3'
    },
    {
        title: 'April',
        value: '4'
    },
    {
        title: 'May',
        value: '5'
    },
    {
        title: 'June',
        value: '6'
    },
    {
        title: 'July',
        value: '7'
    },
    {
        title: 'August',
        value: '8'
    },
    {
        title: 'September',
        value: '9'
    },
    {
        title: 'October',
        value: '10'
    },
    {
        title: 'November',
        value: '11'
    },
    {
        title: 'December',
        value: '12'
    },
]