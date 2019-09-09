import React, { Component } from 'react';
import { View, Text, Platform, Image, ScrollView } from 'react-native';
import { Header } from 'react-native-elements'
import { Container, Content, Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import { connect } from 'react-redux'
import firebase from '@firebase/app';
import '@firebase/database'
import '@firebase/storage';
import '@firebase/auth';
import _ from 'lodash';

class Home extends Component {
    state = {
        postList: []
    }

    componentDidMount() {
        //child_added = isi dari object userId, pada kasus ini adalag displayName sama photoUrl
        // userId = sdasdasdasdasdasdas : {
        //          displayName: user1
                //  photoUrl: linkfotouser1.jpg
        // }

        // CreateAppContainer berlaku ketika kita mengirim props
        firebase.database().ref('/post')
        .on('value', snapshot => {
            let postList = []
            _.map(snapshot.val(), (val, id) => {
                firebase.database().ref(`/users/${val.userId}`)
                .once('child_added', (snapshot) => {
                    var value = snapshot.val();
                    console.log(value)
                    postList.push({
                        ...val,
                        id, 
                        username: value.displayName,
                        userPhoto: value.photoURL
                    })
                    this.setState({ postList })
                })
            });
        })
    }

    renderPostList = () => {
        return this.state.postList.map((val, id) => {
            return (
                    <View style={{marginHorizontal: 10}}>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: val.userPhoto }} />
                                    <Body>
                                        <Text>{val.username}</Text>
                                        <Text note>Instagram User</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: val.imageURL }} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Text>
                                    {val.caption}
                                </Text>
                            </CardItem>
                        </Card>
                    </View>
            )
        })
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <View>
                    <Header
                        leftComponent={{
                            text: 'INSTAGRIN',
                            style: {
                                color: 'black',
                                fontSize: 18
                            }
                        }}
                        leftContainerStyle={{ flex: 3 }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -30
                        }}
                    />
                </View>
                <ScrollView>
                    <Content>
                        {this.renderPostList()}
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps)(Home);