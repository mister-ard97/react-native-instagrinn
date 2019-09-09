import React, { Component } from 'react';
import { View } from 'react-native'
import firebase from 'firebase';
import 'firebase/auth'
import { connect } from 'react-redux';
import {alreadyLogin, notLoginYet} from '../actions';
import Main from './Main';

class AppInit extends Component {
    componentDidMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDNKe5u_6TMbNmdndXbrv9RX4dcos8U9kM",
            authDomain: "instagrinn-bda3b.firebaseapp.com",
            databaseURL: "https://instagrinn-bda3b.firebaseio.com",
            projectId: "instagrinn-bda3b",
            storageBucket: "instagrinn-bda3b.appspot.com",
            messagingSenderId: "563176941251",
            appId: "1:563176941251:web:3330209119b24a4b"
        };
        // Initialize Firebase
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // untuk mengecek apakah user telah login atau belum
        // Kalo sudah login maka terus login
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                // { user }
                this.props.alreadyLogin({ user });
            } else {
                this.props.notLoginYet();
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Main />
            </View>
        );
    }
}


export default connect(null , {
    alreadyLogin,
    notLoginYet
})(AppInit);