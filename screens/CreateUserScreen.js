import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Input, Button, Card } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

import axios from 'axios'

const CreateUserScreen = () => {

    // input refs
    const inputEmail = React.createRef();
    const inputName = React.createRef();
    const inputPassword = React.createRef();
    const inputPasswordConfirm = React.createRef();

    // natigation
    const nav = useNavigation()

    // states
    const [name, setname] = useState() // user name
    const [errorName, setErrorName] = useState('') // error name
    const [email, setemail] = useState() // user email
    const [errorEmail, setErrorEmail] = useState('') // error email
    const [password, setpassword] = useState() // user password
    const [errorPassword, setErrorPassword] = useState('') // error password
    const [password2, setpassword2] = useState() // user password2
    const [errorPassword2, setErrorPassword2] = useState('') // error password2

    // create account
    const createAccount = async () => {
        if(name && email && password && password2){
            if(password === password2){
                // create user
                const User = { name: name, email: email, password: password }
                const res = await axios.post('https://notenet.es/api/users/create', { user: User });
                const data = await res.data
                if (data.status[0]) {
                    // navigate to logIn
                    nav.navigate('Log', { alertToShow: data.status[1] })
                }else{
                    // errors
                    const errorType = data.status[2]
                    if (errorType == '01n'){
                        Alert.alert('Error',  data.status[1])
                    }
                    if (errorType == '02n'){
                        await inputPassword.current.shake()
                        setErrorPassword(data.status[1])
                    }
                    if (errorType == '03n'){
                        await inputEmail.current.shake()
                        setErrorEmail(data.status[1])
                    }
                    if (errorType == '04n'){
                        await inputPassword.current.shake()
                        setErrorName(data.status[1])
                    }
                }
            }else{
                setErrorPassword2('Passwords do not match')
                await inputPasswordConfirm.current.shake()
            }
        }else{
            if(!name){
                await inputName.current.shake()
                setErrorName('Name can not be null.')
            }else{
                setErrorName('')
            }
            if(!email){
                await inputEmail.current.shake()
                setErrorEmail('Email can not be null.')
            }else{
                setErrorEmail('')
            }
            if(!password){
                await inputPassword.current.shake()
                setErrorPassword('Password can not be null.')
            }else{
                setErrorPassword('')
            }
            if(!password2){
                await inputPasswordConfirm.current.shake()
                setErrorPassword2('You must confirm your password.')
            }else{
                setErrorPassword2('')
            }
        }
    }

    return (
        <View style={styles.GeneralViewContainer}>
            <View style={{ marginTop: '30%' }}>
                <Card containerStyle={{ backgroundColor: '#fff' }} wrapperStyle={{}}>
                    <Card.Title>Create account</Card.Title>
                    <Card.Divider />
                    <View
                        style={{
                            position: "relative"
                        }}
                    >
                        <View style={styles.InputsContainer}>

                            <Input
                                ref={inputEmail}
                                placeholder='E-mail'
                                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setemail(value)}
                                errorMessage={errorEmail}
                            />

                            <Input
                                ref={inputName}
                                placeholder='Name'
                                leftIcon={{ type: 'font-awesome', name: 'user' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setname(value)}
                                errorMessage={errorName}
                            />

                            <Input
                                ref={inputPassword}
                                placeholder="Password"
                                leftIcon={{ type: 'font-awesome', name: 'unlock' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                secureTextEntry={true}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setpassword(value)}
                                errorMessage={errorPassword}
                            />

                            <Input
                                ref={inputPasswordConfirm}
                                placeholder="Repeat password"
                                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                secureTextEntry={true}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setpassword2(value)}
                                errorMessage={errorPassword2}
                            />

                        </View>

                        <Button
                            onPress={() => {
                                createAccount()
                            }}
                            buttonStyle={styles.ButtonGeneralStyle}
                        >
                            <Text style={styles.TextButtonLogIn}>
                                Log In
                            </Text>
                        </Button>
                    </View>
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    GeneralViewContainer: {
        backgroundColor: 'rgb(7,12,2)',
        height: '100%'
    },
    InputsContainer: {
        backgroundColor: 'rgb(240,240,240)',
        alignItems: 'center',
        paddingTop: 10
    },
    TextButtonLogIn: {
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        flex: 1,
        fontSize: 20
    },
    ButtonGeneralStyle: {
        backgroundColor: '#071220',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    }
})

export default CreateUserScreen