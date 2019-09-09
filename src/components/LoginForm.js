import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import {
    loginUser,
    emailLoginChanged,
    passwordLoginChanged
} from '../actions'

class LoginForm extends Component {
    state = {
        pasHidden: true
    }

    componentDidUpdate = () => {
        if (this.props.user) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'MainMenu'
                    })
                ]
            })

            this.props.navigation.dispatch(resetAction)
        }
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ color: 'red' }}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    onBtnLoginPress = () => {
        this.props.loginUser(
            this.props.email,
            this.props.password
        )
    }

    render() {
        const { containerStyle, inputStyle } = styles
        return (
            <View style={containerStyle}>
                <Animatable.Text animation={'fadeInDown'}>
                    <Text h3 h3Style={{ color: '#4298f5' }}>Instagrin</Text>
                </Animatable.Text>
                <Animatable.View style={inputStyle}>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={24}
                                color='#4298f5'
                            />
                        }
                        value={this.props.email}
                        onChangeText = {(text) => this.props.emailLoginChanged(text)}
                    />
                    <Input
                        secureTextEntry={this.state.pasHidden}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='#4298f5'
                            />
                        }
                        rightIcon={
                            <Icon
                                name={this.state.pasHidden ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={this.state.pasHidden ? '#bfc3c9' : '#4388d6'}
                                onPress={() => this.setState({ pasHidden: !this.state.pasHidden })}
                            />
                        }
                        value={this.props.password}
                        onChangeText={(text) => this.props.passwordLoginChanged(text)}
                    />
                </Animatable.View>
                {this.renderError()}
                <Button
                    icon={
                        <Icon
                            name="login"
                            size={20}
                            color="white"
                            type='antdesign'
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    title="Login"
                    //type="outline"
                    loading={this.props.loading}
                    onPress={this.onBtnLoginPress}
                    containerStyle={{ width: '95%', backgroundColor: '#4298f5', marginBottom: 10 }}
                    
                />
                <Button
                    icon={
                        <Icon
                            name="adduser"
                            size={15}
                            color="black"
                            type='antdesign'
                            iconStyle={{marginRight: 10 }}
                        />
                    }
                    title="Register"
                    type="outline"
                    containerStyle={{ width: '95%' }}
                    onPress={() => this.props.navigation.navigate('Register')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: "center"
    },
    inputStyle: {
        marginTop: 30,
        marginBottom: 50,
        width: '95%'
    }
})

const mapStateToProps = ({loginForm, auth}) => {
    return {
        email: loginForm.email,
        password: loginForm.password,
        loading: loginForm.loading,
        error: loginForm.error,
        user: auth.user
    }
}

export default connect(mapStateToProps, {
    emailLoginChanged,
    passwordLoginChanged,
    loginUser
})(LoginForm);