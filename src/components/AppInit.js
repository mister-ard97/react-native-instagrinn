import React, { Component } from 'react';
import { View } from 'react-native'
import Main from './Main';

class AppInit extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Main />
            </View>
        );
    }
}


export default AppInit;