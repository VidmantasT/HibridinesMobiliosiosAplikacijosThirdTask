import {Component} from 'react';
import {Text, AsyncStorage, StyleSheet, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Field, reduxForm} from 'redux-form';
import InputText from '../components/inputText';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createNewUser } from '../store/actions/actions'

const registerScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 20}}>SIGN UP</Text>
            <TextInput 
            style={styles.input} 
            placeholder='Username'
            onChangeText={(val) => textInputChange(val)}
            >
            </TextInput>
            <TextInput 
            style={styles.input} 
            placeholder='Password'
            onChangeText={(val) => handlePasswordChange(val)}
            >

            </TextInput>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={{fontSize: 20, color: 'white'}}>SIGN UP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )

}
/*
<TextInput 
                style={styles.input} 
                placeholder="Username"
                value={this.state.username}
                onChangeText={this.setUsername}
                />
                <TextInput 
                style={styles.input} 
                placeholder="Password"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={this.setPassword}
                />
*/

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

export default registerScreen;