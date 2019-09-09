import React, { Component } from 'react';
import { View, Platform} from 'react-native';
import { Header, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        if(this.props.user) {
            return (
                <View>
                    <Header
                        leftComponent={{
                            text: this.props.user.user.displayName,
                            style: {
                                color: 'black',
                                fontSize: 18
                            }
                        }}
                        leftContainerStyle={{ flex: 3 }}
                        rightComponent={{
                            icon: 'menu',
                            color: 'black',
                            onPress: () => this.props.navigation.toggleDrawer()
                        }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                            marginTop: Platform.OS === 'ios' ? 0 : -30
                        }}
                    />
                    <ListItem
                        leftAvatar={{
                            source: { uri: this.props.user.user.photoURL },
                            showEditButton: true,
                            size: 'large'
                        }}
                        title={this.props.user.user.displayName}
                        subtitle={'Instagrin User'}
                    />
                </View>
            )
        }

        return <View />
    }   
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps)(Profile);