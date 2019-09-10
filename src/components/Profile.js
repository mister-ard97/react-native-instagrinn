import React, { Component } from 'react';
import { View, Platform, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import firebase from '@firebase/app';
import '@firebase/database'
import '@firebase/storage';
import '@firebase/auth';
import _ from 'lodash';
import { editProfileInit, editPostInit } from '../actions';

class Profile extends Component {
    state = {
        userPosts: []
    }

    componentDidMount() {
        firebase.database().ref('/post')
        .on('value', snapshot => {
            let userPosts = []
            _.map(snapshot.val(), (val, id) => {
                if(val.userId === this.props.user.user.uid) {
                    userPosts.push({...val, id})
                    this.setState({userPosts})
                }
            })
        }) 
    }

    onBtnEditProfilePress = () => {
        this.props.editProfileInit(
            this.props.user.user.displayName,
            this.props.user.user.photoURL
        )
        this.props.navigation.navigate('EditProfile')
    }

    onBtnEditPostPress = (id, image, caption) => {
        /* let objPost = {
            id,
            image,
            caption
        } */
        this.props.editPostInit(
            id,
            image,
            caption
        )
        this.props.navigation.navigate('EditPost')
    }

    renderUserPost = () => {
            return this.state.userPosts.map((val, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => this.onBtnEditPostPress(
                            val.id,
                            val.imageURL,
                            val.caption)
                        }
                        style={{
                            width: '32.5%',
                            padding: 1
                        }}
                    >
                        <Image source={{ uri: val.imageURL }} style={{ height: 100, marginTop: 10}} />
                    </TouchableOpacity>
                )
            })
    }

    render() {
        if(this.props.user) {
            return (
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={{
                            text: this.props.user.user.displayName ,
                            style: {
                                color: 'black',
                                fontSize: 18
                            }
                        }}
                        leftContainerStyle={{ flex: 3 }}
                        rightComponent={{
                            icon: 'menu',
                            color: 'black',
                            onPress: () => this.props.navigation.toggleDrawer()
                        }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -30
                        }}
                    />
                    <ScrollView>
                        <ListItem
                            leftAvatar={{
                                source: { uri: this.props.user.user.photoURL },
                                size: 'large'
                            }}
                            title={this.props.user.user.displayName}
                            subtitle={'Instagrin User'}
                        />
                        <Button
                            title="Edit Profile"
                            containerStyle={{ marginTop: 15, marginHorizontal: 15 }}
                            buttonStyle={{ borderColor: 'black' }}
                            titleStyle={{ color: 'black' }}
                            type='outline'
                            onPress={this.onBtnEditProfilePress}
                        />
                        <View style={{
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            {this.renderUserPost()}
                        </View>
                    </ScrollView>
                </View>
            )
        }

        return <View />
    }   
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, {editProfileInit, editPostInit})(Profile);