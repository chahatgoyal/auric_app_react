import React from "react";
import { Platform, StatusBar } from "react-native";
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormTab from './src/FormTab';
import AddUser from './src/AddUser'; //Stack Nav
import LoginScreen from './src/LoginScreen';
import Drawer from './src/Drawer/Drawer';
import Others from './src/Others';
import Reports from './src/Reports';
import Users from './src/Users';
import Submissions from './src/Submissions';
import DownloadReports from './src/DownloadReports';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const LoginNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Login",
      headerVisible:false
    }
  }
},{headerMode:"none",});

export const DrawerNavigatorIntern = createDrawerNavigator({
  SubmitForm: {
    screen: FormTab,
    navigationOptions: {
      drawerLabel: 'Form',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
  MySubmissions: {
    screen: Submissions,
    navigationOptions: {
      drawerLabel: 'My Submissions',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
  Others: {
    screen: Others,
    navigationOptions: {
      drawerLabel: 'Others',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
},{
  contentComponent: Drawer,
});

export const DrawerNavigatorAdmin = createDrawerNavigator({
  AddUser: {
    screen: AddUser,
    navigationOptions: {
      drawerLabel: 'Add User',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
  Users: {
    screen: Users,
    navigationOptions: {
      drawerLabel: 'List Users',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
  Reports: {
    screen: Reports,
    navigationOptions: {
      drawerLabel: 'Reports',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
  DownloadReports: {
    screen: DownloadReports,
    navigationOptions: {
      drawerLabel: 'Download Reports',
      drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />,
    }
  },
},{
  contentComponent: Drawer,
});

export const RootNavigator = (signedIn = false, typeOfUser = null) => {
  return createSwitchNavigator(
    {
      SignedInAdmin: {
        screen: DrawerNavigatorAdmin
      },
      SignedInIntern: {
        screen: DrawerNavigatorIntern
      },
      SignedOut: {
        screen: LoginNavigator
      }
    },
    {
      initialRouteName: signedIn ? typeOfUser === 'admin' ? "SignedInAdmin" : "SignedInIntern" : "SignedOut"
    }
  );
};

