import React, { Component } from 'react';
import { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar, TouchableNativeFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Grid, Col } from 'native-base';
import { withNavigationFocus, createStackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';

class Reports extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Reports",
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

    render() {
        return (
            <Container style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                <Grid>
                    <Col style={{ height: '40%', marginRight: 20 }}>
                        <TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate('TabNavigator', {filter:'location', group: 'null'})}}>
                        <Card style={{height:'100%', width:'100%', backgroundColor:'#cd9930', justifyContent: 'center'}}>
                            <CardItem>
                              <Body>
                                <Text style={{color: "#cd9930", textAlign: 'center', width: '100%'}}>
                                   Location Wise
                                </Text>
                              </Body>
                            </CardItem>
                        </Card>
                        </TouchableNativeFeedback>
                    </Col>
                    <Col style={{ height: '40%' }}>
                        <TouchableNativeFeedback onPress={()=>{this.props.navigation.navigate('Groups')}}>
                        <Card style={{height:'100%', width:'100%', backgroundColor:'#cd9930', justifyContent: 'center'}}>
                            <CardItem>
                              <Body>
                                <Text style={{color: "#cd9930", textAlign: 'center', width: '100%'}}>
                                   Group Wise
                                </Text>
                              </Body>
                            </CardItem>
                        </Card>
                        </TouchableNativeFeedback>
                    </Col>
                </Grid>
            </Container>
        );
    }
}

export default withNavigationFocus(Reports);
