
import { createStackNavigator } from 'react-navigation';
import Reports from './reports';
import Groups from './groups';
import TabNavigator from './TabNavigator';
import Search from "./search";

export default createStackNavigator({
    Reports:{
    	screen: Reports,
    },
    Groups:{
    	screen: Groups,
    },
    TabNavigator:{
    	screen: TabNavigator,
    	navigationOptions:{
    		header: null
    	}
    },
    Search:{
        screen: Search
    }
});