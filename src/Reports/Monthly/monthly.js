import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Spinner, Button, Icon, Item, Input } from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../../auth";
import { withNavigationFocus } from "react-navigation";
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../../styles';
import {base_url} from "../../../base_url";

class Monthly extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Monthly Reports",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.navigate('Reports')}>
                <Icon2 name="arrow-left" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.navigate('Search', {data: navigation.state.params.data, filter: navigation.state.params.filter})}>
                <Icon2 name="search" size={20} style={{color:"#fff"}}/>
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
            search: false,
            filter: null,
            value: '10'
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          // Call any action
          this.setState({busy: true},()=>{
            this.fetch();
          })
        }
      }

    componentDidMount(){
        this.props.navigation.setParams({
            data: this.state.data,
            filter: this.props.navigation.dangerouslyGetParent().getParam('filter')
        });
        this.fetch();
    }

    async fetch(){
        let token = null;
        let filter = this.props.navigation.dangerouslyGetParent().getParam('filter');
        let group = this.props.navigation.dangerouslyGetParent().getParam('group');
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));

        await axios.get(base_url + `/api/monthly-reports/?filter=${filter}&group=${group}`, {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then(async (res)=>{
            let data = res.data;
            console.log(data. group, filter)
            this.setState({
                data: data,
                busy: false,
                filter: filter
            },()=>{
                this.props.navigation.setParams({
                    data: this.state.data,
                });
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
        if(this.state.filter === 'group')
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <View style={{flexDirection:'row', justifyContent:'center', marginBottom: 8}}>
                    <Button light style={{margin: 4}} onPress={()=>this.setState({value:String(parseInt(this.state.value) - 1)})}>
                        <Icon name='remove' />
                    </Button>
                    <Item style={{width: '20%'}}>
                        <Input 
                            value={this.state.value}
                            onChangeText={(value)=>this.setState({value})}
                            keyboardType={'numeric'}
                            textAlign={'center'}
                        />
                    </Item>
                    <Button light style={{margin: 4}} onPress={()=>this.setState({value:String(parseInt(this.state.value) + 1)})}>
                        <Icon name='add' />
                    </Button>
                </View>
                <Content>
                  {
                    this.state.data.map(item=>{
                        return(
                                <Card button onPress={()=> alert("yipiee")} key={this.state.data.indexOf(item)}>
                                    <CardItem header style={{paddingBottom: 0}}>
                                      <Text>{item.user.toUpperCase()}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>
                                              Sales:- {item.sales}
                                            </Text>
                                            <Text>
                                              Productivity:- {item.productivity}
                                            </Text>
                                        </Left>
                                        {parseInt(this.state.value) >= parseInt(item.sales) &&
                                            <Right>
                                                <Icon name="thumbs-down" style={{color:"red"}}/>
                                            </Right>
                                        }
                                        {parseInt(this.state.value) < parseInt(item.sales) &&
                                            <Right>
                                                <Icon name="thumbs-up" style={{color:"green"}}/>
                                            </Right>
                                        }
                                    </CardItem>
                                </Card>
                            )
                    })
                  }
                </Content>
            </Container>
        );
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <Content>
                  {
                    this.state.data.map(item=>{
                        return(
                                <Card button onPress={()=> alert("yipiee")} key={this.state.data.indexOf(item)}>
                                    <CardItem header style={{paddingBottom: 0}}>
                                      <Text>{item.location.toUpperCase()}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>
                                              Sales:- {item.sales}
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

export default withNavigationFocus(Monthly);
