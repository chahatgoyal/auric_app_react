import React, { Component } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, Image, ScrollView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../styles';
import { Container, Header, Content, Form, Item, Picker, Label, Input, Text, Button, Toast, Spinner} from 'native-base';
import { onSignIn } from "../../auth";

class LoginScreen extends Component {

	constructor(props){
		super(props);
		this.ref=null
		this.state = {
			username: '',
			password: '',
			busy: false,
			errors: {}
		}
	}

	setUsername(username){
		this.setState({
			username: username
		})
	}

	setPassword(password){
		this.setState({
			password: password
		})
	}

	setErrors(errors){
		this.setState({ errors });
	}

	setBusy(value){
		this.setState({busy: value})
	}

	handleLogin(){
		this.setState({ busy: true}, async ()=>{
			await onSignIn(this.state.username, this.state.password, this.props.navigation, this.setErrors.bind(this), this.setBusy.bind(this))
		})
	}

	render() {
		const { username, password, errors } = this.state;
		return (
			<KeyboardAvoidingView  style={{flex:1, justifyContent:'center'}} behaviour='position' enabled>
				<StatusBar backgroundColor="#cd9930" barStyle="light-content" />
				<ScrollView contentContainerStyle={Styles.loginContainer} keyboardShouldPersistTaps="always">
					<Image
						style={Styles.logo}
						source={require('../assets/img/logo.png')}
					/>
					<Form style={Styles.loginForm}>
						<Item floatingLabel style={Styles.item} error={"username" in errors}>
							<Label>Username</Label>
							<Input 
								returnKeyType = {"next"}
								onSubmitEditing={() => { this.ref._root.focus(); }}
								onChangeText={ (value) => this.setUsername(value)}
							    blurOnSubmit={false}
							    value={username}
							    autoCapitalize="none"
							    clearButtonMode='while-editing'
							/>
						</Item>
						{"username" in errors && 
						<Text style={Styles.error}>{errors["username"]}</Text>}
					<Item floatingLabel style={Styles.item} error={"password" in errors}>
						<Label>Password</Label>
						<Input
							getRef={input => {
						      this.ref = input;
						    }}
						    value={password}
						    onChangeText={ (value) => this.setPassword(value)}
						    returnKeyType = {"next"}
						    type="password"
						    autoCapitalize="none"
						    secureTextEntry={true}
						    onSubmitEditing={()=>this.handleLogin()}
						/>
					</Item>
						{"password" in errors && 
						<Text style={Styles.error}>{errors["password"]}</Text>}
						{"non_field_errors" in errors && 
						<Text style={Styles.error}>{errors["non_field_errors"]}</Text>}
					<Button block disabled={this.state.busy} style={Styles.loginButton} onPress={this.handleLogin.bind(this)}>
						<Text>Login</Text>
						{this.state.busy && <Spinner color="#fff" size={16}/>}
					</Button>
					</Form>
				</ScrollView>
		    </KeyboardAvoidingView>
		);
	}
}

export default LoginScreen;
