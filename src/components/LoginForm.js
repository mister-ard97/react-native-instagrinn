import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';

class LoginForm extends Component {
    state = {
        pasHidden: true
    }
    render() {
        const { containerStyle, inputStyle } = styles
        return (
            <View style={containerStyle}>
                <Text h3 h3Style={{ color: '#4298f5' }}>Instagrin</Text>
                <View style={inputStyle}>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={24}
                                color='#4298f5'
                            />
                        }
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
                    />
                </View>
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

export default LoginForm;