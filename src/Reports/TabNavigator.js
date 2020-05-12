import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import {Icon} from "native-base";
import Daily from "./Daily";
import Monthly from "./Monthly";
import Weekly from "./Weekly";

const Reports = createBottomTabNavigator({
    Daili: {
        screen: Daily,
        navigationOptions: {
            title: "Daily Reports",
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon
                        name="today"
                        size={17}
                        style={{color:tintColor}}/>
                )
            }
        }
    },
    Weekly: {
        screen: Weekly,
        navigationOptions: {
            title: "Weekly Reports",
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon
                        name="calendar"
                        size={17}
                        style={{color:tintColor}}/>
                )
            }
        }
    },
    Monthly: {
        screen: Monthly,
        navigationOptions: {
            title: "Monthly Reports",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="stats"
                    size={17}
                    style={{color:tintColor}}/>
            )
        }
    },
},{
    initialRouteName: 'Weekly',
    tabBarOptions:{
        activeTintColor: '#fff',
        inactiveTintColor: 'grey',
        inactiveBackgroundColor: "#fff",
        activeBackgroundColor: "#cd9930" ,
    }
});

//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default Reports;