import React, { Component } from 'react';
import { View, Text, Platform, Image } from 'react-native';
import { Header, ListItem, Button, Input, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import {usernameEditProfileChanged } from '../actions';


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
                <View style={{ alignItems: 'center'}} >
                    <Image 
                        source={{uri: this.props.profileImage}} 
                        style={{width: 80, height: 80, borderRadius: 80}}
                    />
                    <Text style={{ color: '#4388d6', fontSize: 17, paddingTop: 10 }}>
                        Change Profile Photo
                    </Text>
                </View>
                <View style={{paddingTop: 15}}>
                    <Text style={{paddingLeft: 15 }}>Username</Text>
                    <Input 
                        placeholder='Username'
                        value={this.props.username}
                        onChangeText={(text) => this.props.usernameEditProfileChanged(text)}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ editProfile }) => {
    return {
        username: editProfile.username,
        profileImage: editProfile.profileImage,
        loading: editProfile.loading,
        error: editProfile.error
    }
}

export default connect(mapStateToProps, { usernameEditProfileChanged })(EditProfile);