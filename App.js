import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import combineReducers from './store/reducers/index';
import loginScreen from './screens/loginScreen';
import showScreen from './screens/showScreen';
import registerScreen from './screens/registerScreen';
import addScreen from './screens/addScreen';
import deleteScreen from './screens/deleteScreen';
import editScreen from './screens/editScreen';
import splashScreen from './screens/splashScreen';
import logoutScreen from './screens/logoutScreen';
import {addAdvertisement} from './store/actions/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './components/context'
import Remember from 'react-remember';
//import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers);
store.dispatch(addAdvertisement('Vaizdo plokštė', '20', 1));
store.dispatch(addAdvertisement('Vaizdo plokštė', '30', 2));

/*
const db = SQLite.openDatabase('car.db');
init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });*/

const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode='none'>
      <RootStack.Screen name="Splash" component={splashScreen}/>
      <RootStack.Screen name="Login" component={loginScreen}/>
      <RootStack.Screen name="Register" component={registerScreen}/>
    </RootStack.Navigator>
  )
} 

const PrivateContainer = () => {
  return (
    <Tab.Navigator
      initialRoute="SHOW"
      tabBarOptions={{activeTintColor: '#deaf04'}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if(route.name === 'SHOW') {
            iconName = focused ? 'md-menu' : 'md-menu';
          }else if(route.name ==='ADD'){
            iconName = focused ? 'md-add-circle' : 'md-add-circle-outline';
          }
          else if(route.name ==='DELETE'){
            iconName = focused ? 'md-trash' : 'md-trash';
          }
          else if(route.name ==='EDIT'){
            iconName = focused ? 'md-create' : 'md-create';
          }
          else if(route.name ==='LOGOUT') {
            iconName = focused ? 'md-log-out' : 'md-log-out';
          }
          return<Ionicons name={iconName} size={size} color={color}/>;
        }
      })}
      tabBarOptions={{
        activeTintColor: '#575DD9',
        inactiveTintColor: 'gray',
      }}
      >
      <Tab.Screen
        name="SHOW"
        component={showScreen}
        options={{
          tabBarLabel: 'SHOW',
        }}
      />
      <Tab.Screen
        name="ADD"
        component={addScreen}
        options={{
          tabBarLabel: 'ADD',
        }}
      />
      <Tab.Screen
        name="DELETE"
        component={deleteScreen}
        options={{
          tabBarLabel: 'DELETE',
        }}
      />
      <Tab.Screen
        name="EDIT"
        component={editScreen}
        options={{
          tabBarLabel: 'EDIT',
        }}
      />
      <Tab.Screen
      name="LOGOUT"
      component={logoutScreen}
      options={{
        tabBarLabel: 'LOGOUT',
      }}     
      />
    </Tab.Navigator>
  );
};

const App = () => {

    const initialLoginState = {
      isLoading: true,
      userName: null,
      userToken: null,
      remember: false,
    };

    const loginReducer = (prevState, action) => {
      switch( action.type ) {
        case 'RETRIEVE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT':
          return {
            ...prevState,
            userName: null,
            userToken: null,
            isLoading: false,
          };
        case 'REGISTER':
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'REMEMBER':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            remember: true
          }
      }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)


    const authContext = React.useMemo(() => ({
      signIn: async (foundUser) => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken})
      },
      signOut: async() => {
        //setUserToken(null);
        //setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken')
          await AsyncStorage.removeItem('userTokenFromRemember')
          await AsyncStorage.removeItem('usernameFromRemeber')
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: 'LOGOUT'})
      },
      signUp: () => {
        //setUserToken('fkgj');
        //setIsLoading(false);
      },
      rememberMe: async (foundUser) => {
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username
        try {
          await AsyncStorage.setItem('userTokenFromRemember', userToken)
          await AsyncStorage.setItem('usernameFromRemeber', userName)
        } catch (error) {
          console.log(error)
        }
        dispatch({type: 'REMEMBER', token: userToken})
      }
    }), []);

    useEffect(() => {
      setTimeout(async() => {
        try {
          if(await AsyncStorage.getItem('userTokenFromRemember') !== null && await AsyncStorage.getItem('usernameFromRemeber') !== null) {
            dispatch({type: 'REMEMBER', token: await AsyncStorage.getItem('userTokenFromRemember')})
            console.log('cia')
          }
          else {
            let userToken;
            userToken = null;
            try {
              await AsyncStorage.getItem('userToken')
            } catch (error) {
              console.log(error);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
          }
        } catch (error) {
          
        }
      }, 1000)
    }, []);

    if(loginState.isLoading){
      return(
        <View style={{flex:1, justifyContent: 'center',alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      )
    };
    return(
      <AuthContext.Provider value={authContext}>
        <Provider store={store}>       
          <NavigationContainer>
            {loginState.userToken !== null ? (
            <Stack.Navigator>
              <Stack.Screen 
                name="Private" 
                component={PrivateContainer}
                options={{title: 'Private', headerShown: false}}
              />
            </Stack.Navigator>
            ) :
            <RootStackScreen/>
            }
          </NavigationContainer>
        </Provider>
      </AuthContext.Provider>
    )
  //
  
}

/*
<Stack.Screen 
                name="Register" 
                component={registerScreen}
                options={{title: 'Register', headerShown: false}}
              />
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
