
import { createStackNavigator } from 'react-navigation';
import Submissions from './submissions';
import Edit from "./edit";

export default createStackNavigator({
    Submissions:{
    	screen: Submissions,
    },
    EditSubmission:{
    	screen: Edit,
    },
});