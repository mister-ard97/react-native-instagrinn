import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';

class RegisterForm extends Component {
    render() {
        const { containerStyle, inputStyle } = styles
        return (
            <View style={containerStyle}>
                <Text h3 h3Style={{ color: 'blue' }}>Welcome !</Text>
                <View style={inputStyle}>
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                    />
                </View>

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

export default RegisterForm;