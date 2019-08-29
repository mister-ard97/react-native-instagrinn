import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MainMenuPage from './MainMenu';

export default createAppContainer(createStackNavigator(
    {
        Login: {
            screen: LoginForm
        },
        Register: {
            screen: RegisterForm
        },
        MainMenu: {
            screen: MainMenuPage
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
));


