import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Spinner, Item, Input } from 'native-base';
import { onSignOut, USER_KEY, USER } from "../../auth";
import { withNavigationFocus } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Styles from '../styles';
import {base_url} from "../../base_url";

class Search extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} style={{color:"white"}}/>
            </TouchableOpacity>
        ),
        headerTitle:(
                <Item>
                    <Input 
                        placeholder={'Search'}
                        placeholderTextColor={'white'}
                        underlineColorAndroid={'white'}
                        style={{color: 'white'}}
                        autoFocus
                        onChangeText={(search)=>navigation.state.params.handleChange(search)}
                        />
                </Item>
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
            renderData: [],
            search: '',
            busy:false,
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({
            handleChange: this.handleChange.bind(this)
        });
        this.setState({
            filter: this.props.navigation.getParam('filter'),
            data: this.props.navigation.getParam('data'),
            renderData: this.props.navigation.getParam('data'),
        })
    }

    handleChange(search){
        let renderData = [];
        if(this.state.filter === 'location'){
            renderData = this.state.data.filter(item=>(item.location.toLowerCase().includes(search.toLowerCase())))
        }else{
            renderData = this.state.data.filter(item=>(item.user.toLowerCase().includes(search.toLowerCase())))
        }
        this.setState({
            search,
            renderData
        })
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
                <Content>
                  {
                    this.state.renderData.map(item=>{
                        return(
                                <Card key={this.state.renderData.indexOf(item)}>
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
                    this.state.renderData.map(item=>{
                        return(
                                <Card key={this.state.renderData.indexOf(item)}>
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

export default withNavigationFocus(Search);
