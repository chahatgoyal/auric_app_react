import React, { Component } from 'react';
import ReactNative, { AsyncStorage, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { Spinner, Container, Header, Button, Text, Content, Form, Item, Picker, Input, Label, Toast } from 'native-base';
import { onSignOut, USER_KEY, USER, USER_NAME } from "../../auth";
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { base_url } from "../../base_url";

class AddUser extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Add New User",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        ),
        headerTitleStyle:{
            fontFamily: 'Roboto'
        },
        headerStyle:{
            backgroundColor: "#cd9930",
            color:"#fff",
        },
        headerTitleStyle:{
            color:"#fff"
        }
    })

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            typeOfUser: 'intern',
            name: '',
            error:null,
            busy: false
        }
    }

    validateData(){
        if( this.state.username === '' || 
            this.state.password === '' ||
            this.state.typeOfUser === '' || 
            this.state.name === ''
        ){
            Toast.show({
                text: "Please fill in the form.",
                buttonText: "Okay",
                duration: 2000
              })
            return false
        }else{
            if(this.state.password !== this.state.confirm){
                Toast.show({
                text: "Passwords do not match!",
                buttonText: "Okay",
                duration: 2000
              })
            }else
                return true
        }
    }

    async submitForm(){
        const data = {
            "username": this.state.username,
            "password": this.state.password,
            "name": this.state.name,
            "typeOfUser": this.state.typeOfUser,
        }
        console.log(data)
        let token = null
        this.setState({busy:true}, async ()=>{
            await AsyncStorage.getItem(USER_KEY)
                .then(res => {
                    token = res;
                })
                .catch(err => console.log(err));
            axios.post(base_url + '/api/user/', data, {
                headers: {
                Authorization: 'Token ' + token //the token is a variable which holds the token
                },
              })
              .then((res)=>{
                console.log(res.data)
                this.setState({
                    error: null
                }, ()=>{
                    Toast.show({
                        text: "User Added Successfully",
                        buttonText: "Okay",
                        duration: 2000
                      })
                    this.setState({busy: false, username:'', name:'', password:'', confirm:''})
                    this.props.navigation.navigate('AddUser')
                })
              })
              .catch((err)=>{
                    console.log('try error', err.response.data);
                    this.setState({
                        error: "User with same username exists.",
                        busy: false
                    })
              });
        })
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

        const { error, busy } = this.state;

        return (
            <View style={Styles.container}>
                <StatusBar backgroundColor="#d0a44c" barStyle="light-content" />
                { 
                    busy && 
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
                  {error !== null && 
                        <Text style={Styles.error}>{error}</Text>}
                    <Item picker style={{marginTop:4}}>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.typeOfUser}
                        onValueChange={(typeOfUser)=>{ this.setState({typeOfUser}) }}
                      >
                        <Picker.Item label="Intern" value="intern" />
                        <Picker.Item label="Admin" value="admin" />
                      </Picker>
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Name</Label>
                        <Input 
                            value={this.state.name}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.password))
                                this.username._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            onChangeText={name => this.setState({name})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Username</Label>
                        <Input 
                            getRef={ref => {this.username = ref;}}
                            value={this.state.username}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.confirm))
                                this.password._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            autoCapitalize="none"
                            onChangeText={username => this.setState({username})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Password</Label>
                        <Input 
                            getRef={ref => {this.password = ref}}
                            value={this.state.password}
                            onSubmitEditing={()=>{
                                this._scrollToInput(ReactNative.findNodeHandle(this.button))
                                this.confirm._root.focus();
                            }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            type="password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={password => this.setState({password})}
                        />
                    </Item>
                    <Item floatingLabel style={Styles.formItem} >
                        <Label>Confirm Password</Label>
                        <Input 
                            getRef={ref => (this.confirm = ref)}
                            value={this.state.confirm}
                            onSubmitEditing={() => { this.handleSubmit() }}
                            returnKeyType = {"next"}
                            blurOnSubmit={false}
                            type="password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={confirm => this.setState({confirm})}
                        />
                    </Item>
                    <Button block disabled={this.state.busy} ref={ref => (this.button = ref)} style={Styles.loginButton} onPress={() => { this.handleSubmit() }}>
                        <Text>Add User</Text>
                        {this.state.busy && <Spinner color="#fff" size={16}/>}
                    </Button>
                  </Form>
                  </KeyboardAwareScrollView>
                </View>
              </View>
        );
    }
}

export default AddUser;
