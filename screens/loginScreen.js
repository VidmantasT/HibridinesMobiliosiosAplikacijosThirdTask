import {Component} from 'react';
import {View, Text, SafeAreaView, Button, StyleSheet, Alert, CheckBox} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {login} from '../store/actions/actions';
import uuidV4 from 'uuid/v4';
import { AuthContext } from '../components/context'
import { useTheme } from '@react-navigation/native';
import Users from '../model/user';

const loginScreen = ({navigation}) => {
    
    const [data, setData] = React.useState({
        username:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        rememberMe: false
    });

    const {signIn, rememberMe} = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if(val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            })
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        if(val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    
    const handleValidUser = (val) => {
        if(val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const toggleRememberMe = () => {
        if(data.rememberMe === false) {
            setData({
                ...data,
                rememberMe: true,
            });
        } else {
            setData({
                ...data,
                rememberMe: false
            })
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        });

        if(data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Username or password field cannot be empty');
            return;
        }
        if(foundUser.length == 0) {
            Alert.alert('Username or password is incorrect');
            return;
        }
        if(data.rememberMe === true) {
            return rememberMe(foundUser)
        }
        signIn(foundUser);   
            
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 20}}>LOGIN</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Username"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                <TextInput 
                style={styles.input} 
                placeholder="Password"
                secureTextEntry={data.secureTextEntry ? true : false}
                onChangeText={(val) => handlePasswordChange(val)}
                />
                <View style={{flexDirection: 'row'}}>
                    <CheckBox 
                        style={{alignSelf: 'center'}}
                        value={data.rememberMe}
                        onValueChange={() => toggleRememberMe()}
                    />
                    <Text style={{marginTop: 5}}>Remember me</Text>
                </View>
                <TouchableOpacity 
                style={styles.button}
                onPress = {() => {loginHandle(data.username, data.password)}}>
                    <Text style={{color: 'white', fontSize: 18}}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Register')}>
                    <Text style={{color: 'white', fontSize: 18}}>Sign Up</Text>
                </TouchableOpacity>
            </SafeAreaView>
    )
}

export default loginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 0.5,
        borderColor: "#575DD9",
        alignSelf: 'stretch',
        margin: 40,
        marginVertical: 10,
        height: 50,
        borderRadius: 6,
        paddingHorizontal: 16,
        fontSize: 20,
        fontWeight: "300",
    },
    button: {
        backgroundColor: "#575DD9",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        paddingVertical: 10,
        paddingHorizontal: 100,
        marginTop: 20,
        marginHorizontal: 32,
        borderRadius: 6

    }
    
})