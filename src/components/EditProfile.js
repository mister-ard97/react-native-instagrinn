import React, { Component } from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { Header, ListItem, Button, Input } from 'react-native-elements';


class EditProfile extends Component {
    render() {
        return (
            <View>
                <Header 
                    placement='left'
                    leftComponent={{
                        icon: 'clear',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{
                        text: 'Edit Profile',
                        style: {
                            color: 'black',
                            fontSize: 18
                        }
                    }}
                    rightComponent={{
                        icon: 'done',
                        color: '#4388d6'
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -30
                    }}
                />
            </View>
        )
    }
}

export default EditProfile;