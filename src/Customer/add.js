import React, { Component } from 'react';
import ReactNative, { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { withNavigationFocus } from "react-navigation";
import { Container, Header, Button, Text, Content, Form, Item, Picker, Input, Label, Toast, Spinner} from 'native-base';
import { onSignOut, USER_KEY, USER, USER_NAME } from "../../auth";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {base_url} from "../../base_url";

class Add extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Add Customer",
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
            busy: false,
            form_submission: props.navigation.getParam('pk'),
            name: '',
            email: '',
            address: '',
            number: '',
            mind: '',
            body: '',
            skin: '',
            multipack: '',
        }
    }

    async validateData(){
        let flag = false;
        await this.setState({ busy: true }, ()=>{
                if( this.state.name === '' ||
                    this.state.number === '' ||
                    this.state.email === '' ||
                    this.state.address === '' ||
                    this.state.mind === '' ||
                    this.state.skin === '' ||
                    this.state.body === '' ||
                    this.state.multipack === ''
            ){
                Toast.show({
                    text: "Please fill in the form.",
                    buttonText: "Okay",
                    duration: 2000
                  })
                this.setState({busy: false});
                flag = false
            }else{
                flag = true
            }
        })
        return flag;
    }

    async submitForm(){
        const data = {
            "mind": parseInt(this.state.mind),
            "body": parseInt(this.state.body),
            "skin": parseInt(this.state.skin),
            "multipack": parseInt(this.state.multipack),
            "name": this.state.name,
            "email": this.state.email,
            "address": this.state.address,
            "number": this.state.number,
            "form_submission": this.state.form_submission
        }
        console.log(data)
        let token = null
        await AsyncStorage.getItem(USER_KEY)
            .then(res => {
                token = res;
            })
            .catch(err => console.log(err));
        axios.post(base_url + '/api/customer/', data, {
            headers: {
            Authorization: 'Token ' + token //the token is a variable which holds the token
            },
          })
          .then((res)=>{
            console.log(res)
            Toast.show({
                text: "Form has been submitted successfully!",
                buttonText: "Okay",
                duration: 2000
              })
            this.setState({
                name: '',
                email: '',
                address: '',
                number: '',
                mind: '',
                body: '',
                skin: '',
                multipack: '',
            },()=>this.props.navigation.navigate("List"))
          })
          .catch((err)=>{
            console.log('error', err);
            this.setState({ busy: false})
            if(err.response.data[0] === "Not allowed")
            Toast.show({
                text: "You have already submitted the form, Check My Submissions tab to edit!",
                buttonText: "Okay",
                duration: 2000
              })
          });
    }

    async handleSubmit(){
        if(this.validateData()){
            this.submitForm();
        }
    }

    _scrollToInput (reactNode: any) {
      // Add a 'scroll' ref to your ScrollView
      this.scroll.props.scrollToFocusedInput(reactNode)
    }

    render() {
        return (
            <View style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                { 
                    this.state.busy && 
                    <View style={Styles.loadingContainer}>
                        <Spinner color="#cd9930" />
                    </View>
                }
                <View>
                    <KeyboardAwareScrollView
                    innerRef={ref => {
                    this.scroll = ref
                  }}
                  extraScrollHeight={50}
                  >
                  <Form>
                    <Text style={Styles.formLabel}>Customer Info</Text>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Customer Name</Label>
                        <Input 
                            value={this.state.name}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.address))
                                this.email._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            onChangeText={name => this.setState({name})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Customer Email</Label>
                        <Input 
                            getRef={ref => {this.email = ref;}}
                            value={this.state.email}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.number))
                                this.address._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            onChangeText={email => this.setState({email})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Customer Address</Label>
                        <Input 
                            getRef={ref => {this.address = ref}}
                            value={this.state.address}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.mind))
                                this.number._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            onChangeText={address => this.setState({address})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Customer Number</Label>
                        <Input 
                            getRef={ref => (this.number = ref)}
                            value={this.state.number}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.body))
                                this.mind._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={number => this.setState({number})}
                        />
                    </Item>
                    <Text style={Styles.formLabel}>Stock Sales</Text>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Mind Bottles</Label>
                        <Input 
                            getRef={ref => (this.mind = ref)}
                            value={this.state.mind}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.skin))
                                this.body._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={mind => this.setState({mind})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Body Bottles</Label>
                        <Input 
                            getRef={ref => (this.body = ref)}
                            value={this.state.body}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.multipack))
                                this.skin._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={body => this.setState({body})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Skin Bottles</Label>
                        <Input 
                            getRef={ref => (this.skin = ref)}
                            value={this.state.skin}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.button))
                                this.multipack._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={skin => this.setState({skin})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Multipack Bottles</Label>
                        <Input 
                            getRef={ref => (this.multipack = ref)}
                            value={this.state.multipack}
                            onSubmitEditing={()=>{
                                this.handleSubmit()
                            }}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            onChangeText={multipack => this.setState({multipack})}
                        />
                    </Item>
                    <Button block disabled={this.state.busy} ref={ref => (this.button = ref)} style={Styles.loginButton} onPress={() => { this.handleSubmit() }}>
                        <Text>Submit</Text>
                        {this.state.busy && <Spinner color="#fff" size={16}/>}
                    </Button>
                  </Form>
                  </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }
}

export default withNavigationFocus(Add);
