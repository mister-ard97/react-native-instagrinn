import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default createAppContainer(createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        Register: {
            screen: RegisterForm
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
));


