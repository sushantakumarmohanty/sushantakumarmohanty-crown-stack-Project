import React, { Component } from 'react'
import { Container, Content, Icon } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking, FlatList } from 'react-native';
import Logo from '../assets/images/login.png'
import styles from '../style';
import { connect } from 'react-redux'
import { loggedOut } from '../storage/action'
import logout from '../assets/images/Logout.png'
import { widthPercentageToDP } from '../const';
class Homepage extends Component {
    constructor(props){
        super(props)
        this.state={
            profile : props.profile
        }
    }
    callLogout = () =>{
        this.props.loggedOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <Container>
                    <View style ={{backgroundColor :'#c3c3c3', height :50,alignItems :'center', flexDirection:'row'}}>
                        <View style ={styles.homepage_header}>
                            <Text style={styles.homepage_text}>Home page</Text>
                        </View>
                        <View style ={{flex : 0.8}}>
                            <TouchableOpacity onPress={()=>this.callLogout()} style ={{alignSelf:'center'}}>
                                <Image source={logout} style={{ height : 30, width:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Content ref={c => this._content = c}>
                        <View style={styles.homepage_wrapper}>
                            <View style={styles.signup_imageView}>
                                <Image source={Logo} style={styles.signup_image_path} />
                            </View>
                        </View>
                        <View style={styles.welcome_container}>
                            <Text style={styles.homepage_welcome_text }>Hi {this.state.profile.name}, welcome!</Text>
                        </View>
                    </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.authReducer.profile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loggedOut: () => dispatch(loggedOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)