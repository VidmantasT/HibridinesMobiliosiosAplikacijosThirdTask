import {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {showAll} from '../store/actions/actions';
import { ScrollView } from 'react-native-gesture-handler';

class showScreen extends Component{
    componentDidMount(){
        this.props.showAll();
    }
    render(){
        const {advertisements} = this.props;
        return(
            <SafeAreaView style={testStyles.container}>
                <View style={testStyles.rect}>
                    <Text style={testStyles.allAdvertisements}>ALL ADVERTISEMENTS</Text>
                </View>
                <View style={testStyles.rect2Row}>
                    <View style={testStyles.rect2}>
                        <Text style={testStyles.allAdvertisements}>Title</Text>
                    </View>
                    <View style={testStyles.rect3}>
                        <Text style={testStyles.allAdvertisements}>Price</Text>
                    </View>
                </View>
                <ScrollView>
                     {advertisements.advertisements.map((advertisement, index) =>
                     <View style={testStyles.rect4Row} key={index}>
                         <View style={testStyles.rect4}>
                            <Text style={testStyles.allAdvertisements}>
                                {advertisement.title}
                            </Text>
                         </View>
                         <View style={testStyles.rect5}>
                            <Text style={testStyles.allAdvertisements}>
                                {advertisement.price} €
                            </Text>
                         </View>
                     </View>
                     )}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const testStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    rect: {
      width: 421,
      height: 76,
      backgroundColor: "#79ECFF",
      justifyContent: 'center',
    },
    allAdvertisements: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    rect2: {
      width: 275,
      height: 35,
      backgroundColor: "#31CBE4",
      borderWidth: 1,
      borderColor: "#000000",
      justifyContent: 'center',
    },
    loremIpsum: {
        paddingTop: 30,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    rect3: {
      width: 146,
      height: 35,
      backgroundColor: "#31CBE4",
      borderWidth: 1,
      borderColor: "#000000",
      justifyContent: 'center',
    },
    loremIpsum3: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 9,
      marginLeft: 32
    },
    rect2Row: {
      height: 35,
      flexDirection: "row"
    },
    rect4: {
      width: 275,
      height: 51,
      backgroundColor: "#E6E6E6",
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: "#000000",
    },
    rect5: {
      width: 146,
      height: 51,
      backgroundColor: "#E6E6E6",
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: "#000000",
    },
    rect4Row: {
      height: 51,
      flexDirection: "row"
    }
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    advertisementsContainer: {
        borderTopWidth: 3,
        borderColor: '#ddd',
        flex: 1,
    },
    advertisementsStyle: {
        padding: 20,
        backgroundColor: '#ededed',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
    },
    title: {
        paddingTop: 30,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    advertisements: {
        paddingTop: 30,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
});


const mapStateToProps = (state) => {
    return {
        advertisements: state.advertisements,
    };
}
export default connect(mapStateToProps, {showAll})(showScreen);