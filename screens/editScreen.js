import {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import {showAll, editAdvertisement} from '../store/actions/actions';

class editScreen extends Component {
    componentDidMount() {
        this.props.showAll();
    }
    render(){
        const {advertisements} = this.props;
        return(
            <SafeAreaView style={testStyles.container}>
                <View style={testStyles.rect}>
                    <Text style={testStyles.allAdvertisements}>DELETE ADVERTISEMENT</Text>
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
                    {advertisements.advertisements.map((advertisement, index) => (
                        <View style={testStyles.rect4Row} key={index}>
                            <View style={testStyles.rect4}>
                                <Text style={testStyles.advertisementStyle}>
                                    {advertisement.title}
                                </Text>
                            </View>
                            <View style={testStyles.rect5}>
                                <Text style={testStyles.advertisementStyle}>
                                    {advertisement.price}
                                </Text>
                            </View>
                        </View>
                    ))}
                    {advertisements.advertisements.map((advertisement, index) => (
                        <View style={styles.deleteButton} key={index}>
                            <TouchableOpacity onPress={() => this.props.editAdvertisement(advertisement.id)}>
                                <View style={testStyles.button}>
                                    <Text style={testStyles.advertisementStyle}>DELETE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const testStyles = StyleSheet.create({
    container: {
      flex: 1,
      borderBottomRightRadius: 7
    },
    advertisementStyle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
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
      borderColor: "#000000"
    },
    loremIpsum: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 9,
      marginLeft: 110
    },
    rect3: {
      width: 146,
      height: 35,
      backgroundColor: "#31CBE4",
      borderWidth: 1,
      borderColor: "#000000"
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
      backgroundColor: "#00639B",
      justifyContent: 'center',
    },
    rect5: {
      width: 146,
      height: 51,
      backgroundColor: "#00639B",
      justifyContent: 'center',
    },
    rect4Row: {
      height: 51,
      flexDirection: "row"
    },
    button: {
      width: 193,
      height: 46,
      backgroundColor: "#575DD9",
      borderRadius: 6,
      marginLeft: 216,
      justifyContent: 'center',
    }
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    advertisementsContainer: {
        borderTopWidth: 3,
        borderColor: '#ddd',
    },
    advertisementsStyle: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#ededed',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
    },
    advertisement: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 22,
        color: '#999',
        fontWeight: 'bold',
    },
    title: {
        paddingTop: 30,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deleteButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    addButton: {
        fontSize: 20,
        color: 'white',
        alignContent: 'center',
    },
    addButtonContainer: {
        width: 100,
        height: 50,
        backgroundColor: '#575DD9',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
});

const mapStateToProps = (state) => {
    return {
        advertisements: state.advertisements,
    }
};

export default connect(mapStateToProps, {showAll, editAdvertisement})(editScreen);