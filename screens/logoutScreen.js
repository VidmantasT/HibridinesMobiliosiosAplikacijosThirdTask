import {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {showAll} from '../store/actions/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import { AuthContext } from '../components/context';


const logoutScreen = ({navigation}) => {
    const {signOut} = React.useContext(AuthContext);
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Button title='Logout' onPress={() => {signOut()}} />
            </View>
    )  
}

export default logoutScreen;