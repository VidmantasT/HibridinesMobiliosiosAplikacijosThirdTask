import {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {addAdvertisement} from '../store/actions/actions';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import uuidV4 from 'uuid/v4';

class addScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            price: '',
        }
    }

    titleChange(title){
        this.setState({title})
    }

    priceChange(price){
        this.setState({price})        
    }

    onSubmit = () => {
        const isValidPrice = isNaN(this.state.price);
        if(this.state.title == '' || this.state.price == ''){
            Alert.alert('Enter empty fields')
        }else if(isValidPrice === true || this.state.price <= 0){
            Alert.alert('Enter valid price');
        }else{
            this.props.addAdvertisement(this.state.title, this.state.price, uuidV4());
            this.setState({title: '', price: ''});
            Alert.alert('Sucess');
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>ADD ADVERTISEMENT</Text>
                <View style={styles.advertisementsContainer}>
                    <TextInput
                    style={styles.input}
                    value={this.state.title}
                    placeholder="Advertisement"
                    onChangeText={(text) => this.titleChange(text)}
                    />
                    <TextInput
                    style={styles.input}
                    value={this.state.price}
                    placeholder="Price"
                    onChangeText={(text => this.priceChange(text))}
                    />
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.onSubmit()}
                    >
                        <Text style={{color: 'white', fontSize: 20}}>Insert</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingTop: 30,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    advertisementsContainer: {
        borderTopWidth: 3,
        borderColor: '#ddd',
        flex: 1,
    },
    input: {
        borderWidth: 0.5,
        borderColor: "#575DD9",
        alignSelf: 'stretch',
        margin: 40,
        marginVertical: 10,
        marginHorizontal: 10,
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
        marginHorizontal: 10,
        borderRadius: 6

    }
    
})

const mapStateToProps = (state) => {
    return {
        advertisements: state.advertisements,
    };
};
export default connect(mapStateToProps, {addAdvertisement})(addScreen);