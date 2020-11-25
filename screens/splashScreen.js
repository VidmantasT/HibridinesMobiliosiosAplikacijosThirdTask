import React, {component} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const splashScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#babab6'}}>
            <Animatable.Image
                animation="slideInDown"
                duration={4000}
                source={require('../assets/1280px-React-icon.svg.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textSign}>Get started</Text>
                    <MaterialIcons
                    name="play-arrow"
                    color="#2dfc03"
                    size={18}
                    />
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default splashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#c7c7c7'
  },
  logo: {
      width: height_logo,
      height: height_logo,
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: "#575DD9",
    borderRadius: 35,
    marginTop: 50,
    marginLeft: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20
  }
});

