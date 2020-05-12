import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, TouchableNativeFeedback, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left, Spinner} from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import { base_url } from "../../base_url";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';

class List extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Customers",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.navigate('Add', {pk: navigation.getParam('pk')})}>
                <Icon name="plus" size={20} style={{color:"#fff"}}/>
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
            busy_mid: false
        }
    }

    componentDidUpdate(prevProps) {
        console.log('try')
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.setState({busy_mid: true},()=>{
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
        await axios.get(base_url + `/api/customer/?id=${this.props.navigation.getParam('pk')}`, {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then(async (res)=>{
            let data = res.data;
            console.log(data)
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
                                onPress={()=>this.props.navigation.navigate('Add', {pk: this.props.navigation.getParam('pk')})} 
                                style={Styles.noData}>
                                Add Customer
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
                                <TouchableNativeFeedback key={this.state.data.indexOf(item)}>
                                    <Card>
                                        <CardItem header style={{paddingBottom: 0}}>
                                          <Text>
                                              {item.name}
                                          </Text>
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Text>
                                                  ( {item.address} )
                                                </Text>
                                            </Left>
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

export default withNavigationFocus(List);
