import React, { Component } from 'react';
import { View, Text, Platform, Image, TouchableWithoutFeedback, TouchableOpacity , TouchableNativeFeedback, ScrollView } from 'react-native';
import { Header, ListItem, Button, Input, Overlay, Icon} from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase/app';
import '@firebase/database';
import {
    modalClosingPost,
    modalShowingPost,
    editPostSelected, captionEditChanged
} from '../actions'


class EditPost extends Component {

    state = {
        captionEdit: '',
        loading: false
    }

    componentDidUpdate() {
        if (!this.props.user) {
            this.props.screenProps.rootStackNavigator.navigate('Login');
        }
    }

    onBtnEditSelected = () => {
        this.props.editPostSelected();
        this.props.modalClosingPost();
    }

    onBtnDeleteSelected = () => {
        this.setState({loading: true})
        firebase.database().ref(`/post/${this.props.postId}`)
        .remove()
        .then(() => {
            this.setState({ loading: false })
            this.props.modalClosingPost();
            this.props.navigation.navigate('Profile')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnUpdatePost = () => {
        firebase.database().ref(`/post/${this.props.postId}`)
            .set({
                caption: this.props.captionPost,
                imageURL: this.props.imagePost,
                userId: this.props.user.user.uid
            })
            .then(() => {
                this.props.navigation.navigate('Profile')
                this.props.modalClosingPost();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        if (this.props.user === null) {
            return <View />
        }
        if (this.props.postUpdated === 'EditSelected') {
            return (
                <View style={{flex: 1}}>
                    <Header
                        centerComponent={{
                            text: `Edit Posts`,
                            style: {
                                color: 'black',
                                fontSize: 18
                            }
                        }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -28
                        }}
                        rightComponent={{
                            icon: 'done',
                            color: '#4388d6',
                            onPress: this.onBtnUpdatePost
                        }}
                    />
                    <ScrollView>
                        <View style={{ marginHorizontal: 10 }}>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: this.props.user.user.photoURL }} />
                                        <Body>
                                            <Text>{this.props.user.user.displayName}</Text>
                                            <Text note>Instagram User</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity
                                            onPress={() => this.props.modalShowingPost()}
                                        >
                                            <Icon
                                                name='ellipsis-v'
                                                type='font-awesome'

                                            />
                                        </TouchableOpacity>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{ uri: this.props.imagePost }} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                               
                            </Card>
                        </View>
                        <ScrollView>
                            <View>
                                <Input
                                    placeholder='Caption Image'
                                    value={this.props.captionPost}
                                    onChangeText={(text) => this.props.captionEditChanged(text)}
                                />
                            </View>
                        </ScrollView>
                    </ScrollView>
                </View>
            )
        }

        return (
            <View>
                <Header
                    placement='left'
                    leftComponent={{
                        icon: 'arrow-back',
                        color: 'black',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{
                        text: `Posts`,
                        style: {
                            color: 'black',
                            fontSize: 18
                        }
                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -28
                    }}
                />
                <ScrollView>
                    <View style={{ marginHorizontal: 10 }}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: this.props.user.user.photoURL }} />
                                    <Body>
                                        <Text>{this.props.user.user.displayName}</Text>
                                        <Text note>Instagram User</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <TouchableOpacity
                                        onPress={() => this.props.modalShowingPost()}
                                    >
                                        <Icon
                                            name='ellipsis-v'
                                            type='font-awesome'
                                            
                                        />
                                    </TouchableOpacity>
                                </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: this.props.imagePost }} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>
                                        {this.props.captionPost}
                                    </Text>
                                </Left>
                                <Right>
                                    <Button 
                                        type="clear"
                                        title='Delete Post'
                                        icon={
                                            <Icon
                                                name='trash'
                                                type='font-awesome'
                                                color='#4388d6'
                                            />
                                        }
                                        loading={this.state.loading}
                                        onPress={() => this.onBtnDeleteSelected()}
                                    />
                                </Right>
                            </CardItem>
                        </Card>
                    </View>
                    <Overlay
                        isVisible={this.props.modalShowEdit}
                        onBackdropPress={() => this.props.modalClosingPost()}
                        height={'auto'}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => this.onBtnEditSelected()}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingVertical: 15
                                }}
                            >
                                Edit Post
                            </Text>
                        </TouchableWithoutFeedback>
                    </Overlay>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({editPost, auth}) => {
    return {
        user: auth.user ? auth.user : null, 

        postId: editPost.postId,
        imagePost: editPost.imagePost,
        captionPost: editPost.captionPost,
        loading: editPost.loading,
        error: editPost.error,
        postUpdated: editPost.postUpdated,

        modalShowEdit: editPost.modalShow
    }
}

export default connect(mapStateToProps, {
    modalClosingPost,
    modalShowingPost, editPostSelected, captionEditChanged
})(EditPost)