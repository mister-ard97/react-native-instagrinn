import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    usernameRegisterChanged,
    passwordRegisterChanged,
    emailRegisterChanged,
    conPasswordRegisterChanged,
    registerUser
} from '../actions/'

class RegisterForm extends Component {
    state = {
        pasHidden: true, 
        conPasHidden: true
    }

    renderError() {
        if(this.props.error) {
            return (
                <View style={{marginBottom: 15}}>
                    <Text style={{color: 'red'}}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    onBtnRegisterPress = () => {
        this.props.registerUser(
            this.props.email,
            this.props.username,
            this.props.password,
            this.props.conPassword
        )
    }

    render() {
        const { containerStyle, inputStyle } = styles
        return (
            <View style={containerStyle}>
                <Text h3 h3Style={{ color: '#4388d6' }}>Welcome !</Text>
                
                <View style={inputStyle}>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={24}
                                color='#4388d6'
                            />
                        }
                        value={this.props.email}
                        onChangeText={(text) => this.props.emailRegisterChanged(text)}
                    />
                    <Input
                        placeholder='Username'
                        leftIcon={
                            <Icon
                            name='account-box'
                            size={24}
                            color='#4388d6'
                            />
                        }
                        value={this.props.username}
                        onChangeText={(text) => this.props.usernameRegisterChanged(text)}
                    />
                    <Input
                    secureTextEntry={this.state.pasHidden}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='#4388d6'
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
                        onChangeText={(text) => this.props.passwordRegisterChanged(text)}
                    />
                    <Input
                    secureTextEntry={this.state.conPasHidden}
                        placeholder='Confirm Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='#4388d6'
                            />
                        }
                        rightIcon={
                            <Icon
                                name={this.state.conPasHidden ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={this.state.conPasHidden ? '#bfc3c9' : '#4388d6'}
                                onPress={() => this.setState({ conPasHidden: !this.state.conPasHidden })}
                            />
                        }
                        value={this.props.conPassword}
                        onChangeText={(text) => this.props.conPasswordRegisterChanged(text)}
                    />
                </View>
                {this.renderError()}
                <Button
                    icon={
                        <Icon
                            name="adduser"
                            size={15}
                            color="black"
                            type='antdesign'
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    title="Register"
                    //type="outline"
                    containerStyle={{ width: '95%', backgroundColor: '#4298f5' }}
                    loading={this.props.loading}
                    onPress={this.onBtnRegisterPress}
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

const mapStateToProps = ({ registerForm }) => {
    return {
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password,
        conPassword: registerForm.conPassword,
        loading: registerForm.loading,
        error: registerForm.error
    }
}

export default connect(mapStateToProps, {
    usernameRegisterChanged,
    passwordRegisterChanged,
    conPasswordRegisterChanged,
    emailRegisterChanged,
    registerUser
})(RegisterForm);