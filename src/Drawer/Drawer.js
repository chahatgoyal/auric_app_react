import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { TouchableNativeFeedback, TouchableWithoutFeedback, ScrollView, View, AsyncStorage } from 'react-native';
import { List, ListItem, Text, Left, Right, Icon } from 'native-base';
import Styles from '../styles';
import { onSignOut, USER_NAME, USER_USERNAME, USER_TYPE } from '../../auth';

class Drawer extends Component {

  constructor(props){
    super(props);
    this.state = {
      name:'',
      username:'',
      type: null
    }
  }

  async componentWillMount(){
    const type = await AsyncStorage.getItem(USER_TYPE);
    const username = await AsyncStorage.getItem(USER_USERNAME);
    const name = await AsyncStorage.getItem(USER_NAME);
    this.setState({type, username, name})
  }

  navigateToScreen(route){
    console.log('tesing navigation from drawer', this.props)
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    const { type, name, username } = this.state;
    return (
      <View style={Styles.drawerContainer}>
        <View style={Styles.drawerProfile}>
          <Text style={{color:'#fff', fontSize: 18}}>{name.toUpperCase()}</Text>
          <Text style={{color:'#fff', fontSize: 16}}>({username})</Text>
        </View>
        <ScrollView>
          {type === 'intern' && 
            <List>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('SubmitForm'); }}>
                <ListItem selected={this.props.activeItemKey === 'SubmitForm'}>
                  <Left>
                    <Text>Submit Form</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('Customer'); }}>
                <ListItem selected={this.props.activeItemKey === 'Customer'}>
                 <Left>
                    <Text>Customers</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('MySubmissions'); }}>
                <ListItem selected={this.props.activeItemKey === 'MySubmissions'}>
                 <Left>
                    <Text>My Submissions</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('Others'); }}>
                <ListItem selected={this.props.activeItemKey === 'Others'}>
                  <Left>
                    <Text>Other's Submissions</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          }
          {
            type === 'admin' &&
            <List>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('AddUser'); }}>
                <ListItem selected={this.props.activeItemKey === 'AddUser'}>
                  <Left>
                    <Text>Add User</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('Users'); }}>
                <ListItem selected={this.props.activeItemKey === 'Users'}>
                  <Left>
                    <Text>Users</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('Reports'); }}>
                <ListItem selected={this.props.activeItemKey === 'Reports'}>
                  <Left>
                    <Text>Reports</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => { this.navigateToScreen('DownloadReports'); }}>
                <ListItem selected={this.props.activeItemKey === 'DownloadReports'}>
                  <Left>
                    <Text>Download CSV</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </TouchableNativeFeedback>
            </List>
          }
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => { onSignOut(this.props.navigation) }}>
          <ListItem style={{backgroundColor:'#d0a44c', marginLeft:0, paddingLeft:18}} >
            <Left>
              <Icon name="power" style={{color:'#fff', marginRight:12}}/>
              <Text style={{color:'#fff'}}>Logout</Text>
            </Left>
          </ListItem>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Drawer;