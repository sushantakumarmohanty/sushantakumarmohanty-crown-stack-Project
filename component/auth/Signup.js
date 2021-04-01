import React, { Component } from 'react'
import { Container, Content, Icon } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking } from 'react-native';
import { RegEx } from '../../config/AppConfig';
import styles from '../../style';
import { connect } from 'react-redux'
import { logged } from '../../storage/action'
import { StackActions, NavigationActions } from 'react-navigation';
import { callAPI } from '../../config/Utility'

const onlogOn = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Homepage' })],
})
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errorTextinput: false,
            disableCTA: true,
            email: "",
            isFocusOnTextbox: false,
            isFocusOnNamebox :false,
            isFocusOnPass: false,
            toggleShowPass: true,
            showPass: false,
            name :'',
            mobile :'',
            isFocusOnMobilebox :false,
            errorMobileinput :false,
            password: '',
            errorPassword: false,
            errorNameinput :false,
            toggleShowConfirmPass: true,
            showConfirmPass: false,
            confirmPassword: '',
            errorConfirmPassword: false,
            loggedIn: props.loggedIn,
        }
    }

    targetMobileText = enteredValue => {
        if (enteredValue && RegEx.mobileNumber.test(enteredValue && enteredValue.length == 10)) {
            this.setState({
                mobile: enteredValue,
                disableCTA: true
            });
        } else {
            this.setState({
                mobile: enteredValue,
                disableCTA: true
            });
        }
    };

    onFocusMobile = () => {
        this.setState({ isFocusOnMobilebox: true, errorMobileinput: false });
    };

    offFocusMobile = mobile => {
        if (mobile && RegEx.mobileNumber.test(mobile) && mobile.length == 10) {
            this.setState({ errorMobileinput: false, disableCTA: 
                this.state.password != '' 
                && this.state.password == this.state.confirmPassword 
                && !this.state.errorTextinput
                && this.state.email != ''
                && this.state.name != ''
                && !this.state.errorNameinput? false : true, isFocusOnMobilebox: false });
        } else if (!mobile || mobile.length == 0) {
            this.setState({ errorMobileinput: false, disableCTA: true, isFocusOnMobilebox: false });
        } else {
            this.setState({ errorMobileinput: true, disableCTA: true, isFocusOnMobilebox: false });
        }
    };

    targetNameText = enteredValue => {
        if (enteredValue && RegEx.name.test(enteredValue)) {
            this.setState({
                name: enteredValue,
                disableCTA: true
            });
        } else {
            this.setState({
                name: enteredValue,
                disableCTA: true
            });
        }
    };

    onFocusName = () => {
        this.setState({ isFocusOnNamebox: true, errorNameinput: false });
    };

    offFocusName = name => {
        if (name && RegEx.name.test(name)) {
            this.setState({ errorNameinput: false, disableCTA: 
                this.state.password != '' 
                && this.state.password == this.state.confirmPassword  
                && !this.state.errorMobileinput
                && !this.state.errorTextinput
                && this.state.mobile != ''
                && this.state.email !=''? false : true, isFocusOnNamebox: false });
        } else if (!name || name.length == 0) {
            this.setState({ errorNameinput: false, disableCTA: true, isFocusOnNamebox: false });
        } else {
            this.setState({ errorNameinput: true, disableCTA: true, isFocusOnNamebox: false });
        }
    };

    targetEmailText = enteredValue => {
        if (enteredValue && RegEx.email.test(enteredValue)) {
            this.setState({
                email: enteredValue,
                disableCTA: true
            });
        } else {
            this.setState({
                email: enteredValue,
                disableCTA: true
            });
        }
    };

    onFocusTxt = () => {
        this.setState({ isFocusOnTextbox: true, errorTextinput: false });
    };

    offFocusTxt = enteredEmail => {
        if (enteredEmail && RegEx.email.test(enteredEmail)) {
            this.setState({ errorTextinput: false, disableCTA: 
                this.state.password != '' 
                && this.state.password == this.state.confirmPassword  
                && this.state.name != ''
                && this.state.mobile!=''
                && !this.state.errorNameinput
                && !this.state.errorMobileinput? false : true, isFocusOnTextbox: false });
        } else if (!enteredEmail || enteredEmail.length == 0) {
            this.setState({ errorTextinput: false, disableCTA: true, isFocusOnTextbox: false });
        } else {
            this.setState({ errorTextinput: true, disableCTA: true, isFocusOnTextbox: false });
        }
    };

    validatePassword = (pass) => {
        if (pass.length > 0 && RegEx.password.test(pass)) {
            this.setState({
                password: pass,
                showPass: true,
                disableCTA: this.state.password === this.state.confirmPassword && !this.state.errorTextinput && !this.state.email != ''? false :true 
            })
        }
        else {
            this.setState({
                password: pass.substring(0, pass.length - 1),
                password: pass,
                showPass: true,
                disableCTA: true
            })
        }
    }

    callSignupApi =() => {
        const { password, email, name, mobile} = this.state
        let request = {}
        request.password = password
        request.email = email
        request.name = name
        request.mobileNo = parseInt(mobile)
        callAPI("signup",request).then((res)=>{
            console.log(res)
            if(res){
                this.props.logged(res)
                this.props.navigation.dispatch(onlogOn)
            }
        }).catch((error)=>{
            Alert.alert('',error.message)
        })
    }

    onFocusPass = () => {
        this.setState({ errorPassword: false, isFocusOnPass: true });
    }

    offFocusPass = (pass) => {
        if (pass && RegEx.password.test(pass)) {
            this.setState({ isFocusOnPass: false, errorPassword: false, disableCTA:
                 this.state.password === this.state.confirmPassword 
                 && !this.state.errorTextinput 
                 && this.state.email != ''
                 && !this.state.errorMobileinput
                 && this.state.mobile !=''
                 && this.state.name !==''
                 && !this.state.errorNameinput? false :true });
        } else if (!pass || pass.length == 0) {
            this.setState({ isFocusOnPass: false, errorPassword: false, disableCTA: true });
        } else {
            this.setState({ isFocusOnPass: false, errorPassword: true, disableCTA: true });
        }
    }

    togglePass = () => {
        this.setState({
            toggleShowPass: !this.state.toggleShowPass,
            errorPassword: false

        })
    }

    validateConfirmPassword = (pass) => {
        if (pass.length > 0 &&  pass== this.state.password ) {
            this.setState({
                confirmPassword: pass,
                showConfirmPass: true,
                disableCTA: this.state.password === this.state.confirmPassword && !this.state.errorTextinput && !this.state.email != ''? false :true 
            })
        }
        else {
            this.setState({
                confirmPassword: pass,
                showConfirmPass: true,
                disableCTA: true
            })
        }
    }

    onFocusConfirmPass = () => {
        this.setState({ errorConfirmPassword: false, isFocusOnConfirmPass: true });
    }

    offFocusConfirmPass = (pass) => {
        if (pass && pass==this.state.password) {
            this.setState({ isFocusOnConfirmPass: false, errorConfirmPassword: false, disableCTA: 
                this.state.password === this.state.confirmPassword 
                && !this.state.errorTextinput 
                && this.state.email !=''
                && this.state.name !=''
                && this.state.mobile !=''
                && !this.state.errorNameinput
                && !this.state.errorMobileinput? false :true  });
        } else if (!pass || pass.length == 0) {
            this.setState({ isFocusOnConfirmPass: false, errorConfirmPassword: false, disableCTA: true });
        } else {
            this.setState({ isFocusOnConfirmPass: false, errorConfirmPassword: true, disableCTA: true });
        }
    }

    toggleConfirmPass = () => {
        this.setState({
            toggleShowConfirmPass: !this.state.toggleShowConfirmPass,
            errorConfirmPassword: false

        })
    }

    render() {
        return (
            <Container>
                    <View style ={{backgroundColor :'#c3c3c3', height :50,flexDirection :'row',alignItems:'center'}}>
                        <Text style={{left :15, fontSize :28,flex:1}} onPress={()=>this.props.navigation.goBack()}>X</Text>
                        <Text style={styles.signup_header}>Register page</Text>
                    </View>
                    <Content ref={c => this._content = c}>
                        <View style={styles.signup_wrapper}>
                            <View style={styles.signup_userNameDiv}>
                                <View style={styles.login_lowerDiv}>
                                    <View width={"100%"}>
                                        <Text style={styles.userName_div}>
                                            Name
                                        </Text>
                                        <TouchableOpacity style={styles.userNameDiv_section}>
                                            <KeyboardAvoidingView
                                                width={"100%"}
                                                behavior="padding"
                                                enabled
                                                style={styles.userName_login}
                                            >
                                                <TextInput
                                                    selectionColor={"#4d5054"}
                                                    defaultValue={this.state.name}
                                                    onFocus={() => this.onFocusName()}
                                                    onBlur={() => this.offFocusName(this.state.name)}
                                                    maxLength={256}
                                                    placeholder="Name"
                                                    autoCapitalize="none"
                                                    placeholderTextColor="grey"
                                                    editable={true}
                                                    onChangeText={name =>
                                                        this.targetNameText(name)
                                                    }
                                                    onSubmitEditing={()=>this.mobile.focus()}
                                                    style={[styles.userName_inbox,
                                                    {
                                                        borderColor: this.state.isFocusOnNamebox
                                                            ? "#800000"
                                                            : "#4d5054"
                                                    }
                                                    ]}
                                                />
                                            </KeyboardAvoidingView>
                                        </TouchableOpacity>

                                        {this.state.errorNameinput === true ? (
                                            <View>
                                                <Text style={styles.invalid_email}>
                                                    Invalid name 
                               </Text>
                                            </View>
                                        ) : (
                                                <View />
                                            )}
                                    </View>
                                    <View style={styles.invalid_padding}>
                                        <Text style={styles.userName_div}>
                                            Mobile number
                                        </Text>
                                        <TouchableOpacity style={styles.userNameDiv_section}>
                                            <KeyboardAvoidingView
                                                width={"100%"}
                                                behavior="padding"
                                                enabled
                                                style={styles.userName_login}
                                            >
                                                <TextInput
                                                    ref={(input)=>this.mobile = input}
                                                    selectionColor={"#4d5054"}
                                                    defaultValue={this.state.mobile}
                                                    onFocus={() => this.onFocusMobile()}
                                                    onBlur={() => this.offFocusMobile(this.state.mobile)}
                                                    maxLength={10}
                                                    keyboardType={'numeric'}
                                                    placeholder="Mobile number"
                                                    autoCapitalize="none"
                                                    placeholderTextColor="grey"
                                                    editable={true}
                                                    onChangeText={mobile =>
                                                        this.targetMobileText(mobile)
                                                    }
                                                    onSubmitEditing={()=>this.email.focus()}
                                                    style={[styles.userName_inbox,
                                                    {
                                                        borderColor: this.state.isFocusOnMobilebox
                                                            ? "#800000"
                                                            : "#4d5054"
                                                    }
                                                    ]}
                                                />
                                            </KeyboardAvoidingView>
                                        </TouchableOpacity>

                                        {this.state.errorMobileinput === true ? (
                                            <View>
                                                <Text style={styles.invalid_email}>
                                                    Invalid mobile number
                               </Text>
                                            </View>
                                        ) : (
                                                <View />
                                            )}
                                    </View>
                                    <View style={styles.invalid_padding}>
                                        <Text style={styles.userName_div}>
                                            Email
                                        </Text>
                                        <TouchableOpacity style={styles.userNameDiv_section}>
                                            <KeyboardAvoidingView
                                                width={"100%"}
                                                behavior="padding"
                                                enabled
                                                style={styles.userName_login}
                                            >
                                                <TextInput
                                                    ref={(input)=>this.email = input}
                                                    selectionColor={"#4d5054"}
                                                    defaultValue={this.state.email}
                                                    onFocus={() => this.onFocusTxt()}
                                                    onBlur={() => this.offFocusTxt(this.state.email)}
                                                    maxLength={256}
                                                    placeholder="Username"
                                                    autoCapitalize="none"
                                                    placeholderTextColor="grey"
                                                    editable={true}
                                                    onChangeText={email =>
                                                        this.targetEmailText(email.toLowerCase())
                                                    }
                                                    onSubmitEditing={()=>this.password.focus()}
                                                    style={[styles.userName_inbox,
                                                    {
                                                        borderColor: this.state.isFocusOnTextbox
                                                            ? "#800000"
                                                            : "#4d5054"
                                                    }
                                                    ]}
                                                />
                                            </KeyboardAvoidingView>
                                        </TouchableOpacity>

                                        {this.state.errorTextinput === true ? (
                                            <View>
                                                <Text style={styles.invalid_email}>
                                                    Invalid Email Address
                               </Text>
                                            </View>
                                        ) : (
                                                <View />
                                            )}
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.invalid_padding}>
                                            <View>
                                                <Text style={styles.password_text}>Password</Text>
                                                <View style={styles.password_input}>
                                                    <TextInput maxLength={20}
                                                        ref={(input)=>this.password = input}
                                                        style={[styles.password_inText, { borderColor: this.state.isFocusOnPass ? '#800000' : '#4d5054' }]}
                                                        secureTextEntry={this.state.toggleShowPass} placeholder="Password"
                                                        placeholderTextColor="grey"
                                                        autoCapitalize="none"
                                                        selectionColor={"#4d5054"}
                                                        maxLength={32}
                                                        onChangeText={(text) => this.validatePassword(text)}
                                                        onFocus={() => this.onFocusPass()}
                                                        onBlur={() => this.offFocusPass(this.state.password)}
                                                        onSubmitEditing = {() => this.confirmPassword.focus()}
                                                    />
                                                    {this.state.showPass ?
                                                        <View style={styles.show_pwd}>
                                                        {this.state.toggleShowPass ?
                                                            <Text onPress={() => { this.togglePass() }}  style={styles.position_abs}>show</Text>
                                                            :
                                                            <Text onPress={() => { this.togglePass() }}  style={styles.position_abs}>hide</Text>
                                                        }
                                                    </View>
                                                        : <View></View>
                                                    }
                                                </View>
                                            </View>

                                        </View>

                                        {this.state.errorPassword ?
                                            <View style={styles.error_pwd}>
                                                <Text style={styles.error_password}>
                                                    Minimum 8 characters & 1 special character required
                                           </Text>
                                            </View> : <View></View>
                                        }
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.invalid_padding}>
                                            <View>
                                                <Text style={styles.password_text}>Confirm password</Text>
                                                <View style={styles.password_input}>
                                                    <TextInput maxLength={20}
                                                        ref={(input)=> this.confirmPassword = input}
                                                        style={[styles.password_inText, { borderColor: this.state.isFocusOnConfirmPass ? '#800000' : '#4d5054' }]}
                                                        secureTextEntry={this.state.toggleShowConfirmPass} placeholder="Password"
                                                        placeholderTextColor="grey"
                                                        autoCapitalize="none"
                                                        selectionColor={"#4d5054"}
                                                        maxLength={32}
                                                        onChangeText={(text) => this.validateConfirmPassword(text)}
                                                        onFocus={() => this.onFocusConfirmPass()}
                                                        onBlur={() => this.offFocusConfirmPass(this.state.confirmPassword)}
                                                    />
                                                    {this.state.showConfirmPass ?
                                                        <View style={styles.show_pwd}>
                                                        {this.state.toggleShowConfirmPass ?
                                                            <Text onPress={() => { this.toggleConfirmPass() }}  style={styles.position_abs}>show</Text>
                                                            :
                                                            <Text onPress={() => { this.toggleConfirmPass() }}  style={styles.position_abs}>hide</Text>
                                                        }
                                                    </View>
                                                        : <View></View>
                                                    }
                                                </View>
                                            </View>

                                        </View>

                                        {this.state.errorConfirmPassword ?
                                            <View style={styles.error_pwd}>
                                                <Text style={styles.error_password}>
                                                    Password mis-match
                                           </Text>
                                            </View> : <View></View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                    <View style={styles.privacy_text_term}>
                        <TouchableOpacity
                            disabled={this.state.disableCTA}
                            onPress={this.callSignupApi}
                            style={[styles.button_disable,
                            {
                                backgroundColor: this.state.disableCTA
                                    ? "#babcbf"
                                    : "#000"
                            }]
                            }
                        >
                            <Text style={[styles.continue_text, { color: this.state.disableCTA ? 'black' : 'white' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logged: profile => dispatch(logged(profile)),
    };
};

export default connect(null, mapDispatchToProps)(SignUp)