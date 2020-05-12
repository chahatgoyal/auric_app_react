
import { createStackNavigator } from 'react-navigation';
import Customer from './Customer';
import Add from './add';
import List from './list';

export default createStackNavigator({
    Customer,
    Add,
    List
});