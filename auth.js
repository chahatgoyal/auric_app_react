import { AsyncStorage } from "react-native";
import axios from 'axios';
import { base_url } from './base_url';

export const USER_KEY = "token";
export const USER = "user";
export const USER_USERNAME = "username";
export const USER_NAME = "name";
export const USER_TYPE = "type";

export const onSignIn = (username, password, navigation, setErrors=null, setBusy=null) => {
  console.log('Sign In with ', username, password)
  axios.post(base_url + '/api-token-auth/', {
    username: username,
    password: password
  })
  .then((res)=>{
    if(res.data.token){
      console.log('token',res.data);
      AsyncStorage.setItem(USER_KEY, res.data.token);
      axios.get(base_url + '/api/get-user/', {
      headers: {
            Authorization: 'Token ' + res.data.token //the token is a variable which holds the token
        }
      })
      .then(async (res)=>{
        await setErrors({});
        AsyncStorage.setItem(USER, String(res.data.pk));
        AsyncStorage.setItem(USER_NAME, String(res.data.name));
        AsyncStorage.setItem(USER_USERNAME, String(res.data.username));
        AsyncStorage.setItem(USER_TYPE, String(res.data.typeOfUser));
        console.log(res.data)
        await setBusy(false);
        if(res.data.typeOfUser === 'admin'){
          navigation.navigate('SignedInAdmin')
        }else{
          navigation.navigate('SignedInIntern')
        }
      })
      .catch((err)=>{
        console.log('error', err.data);
      });
    }else{
      AsyncStorage.setItem(USER_KEY, null);
    }
  })
  .catch(async (err)=>{
    await setErrors(err.response.data);
    await setBusy(false);
    console.log('err', err.response.data);
  });
};

export const onSignOut = (navigation) => {
  AsyncStorage.removeItem(USER_KEY);
  navigation.navigate('SignedOut')
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};