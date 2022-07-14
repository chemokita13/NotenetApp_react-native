import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CheckBox, Input, Button, Card } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'

const LogScreen = ({ route }) => {

    // todo: hacer q pida el server status


    const checkRouteParamAlert = () => {
        if (route.params) {
            if (route.params.alertToShow) {
                const { alertToShow } = route.params
                Alert.alert('Alert', alertToShow)
            }

        }
    }

    

    useEffect(() => {

        checkRouteParamAlert()

    }, [])

    const nav = useNavigation()
    const inputName = React.createRef();
    const inputPassword = React.createRef()

    const [name, setname] = useState()
    const [password, setpassword] = useState()
    const [ErrorVariableName, setErrorVariableName] = useState('')
    const [ErrorVariablePassword, setErrorVariablePassword] = useState('')
    const [check, setCheck] = useState(false)


    const logIn = async () => {

        if (name && password) {

            const User = { name: name, password: password }
            const res = await axios.post('https:/notenet.es/api/logs', { user: User });
            const data = await res.data

            if (data.login) {

                nav.navigate('Notes', { User })
                await setErrorVariableName('')
                await setErrorVariablePassword('')
                if (check) {
                    const jsonValue = JSON.stringify(User);
                    await AsyncStorage.setItem('user', jsonValue)
                }

            } else {

                const errorType = data.error[0]

                if (errorType == '001') {
                    await inputName.current.shake()
                    setErrorVariableName('E-mail or name not found');
                    setErrorVariablePassword(' ')
                } else {
                    if (errorType == '002') {
                        await inputPassword.current.shake()
                        setErrorVariablePassword('Password not correct')
                        setErrorVariableName(' ')
                    }
                }
            }
        } else {

            if (!name) {
                setErrorVariableName('Name or E-mail can not be null.');
                inputName.current.shake()
            }
            if (!password) {
                setErrorVariablePassword('Password can not be null.');
                inputPassword.current.shake()
            }
        }
    }

    return (
        <View style={styles.GeneralViewContainer}>
            <View style={{ marginTop: '30%' }}>
                <Card containerStyle={{ backgroundColor: '#fff' }} wrapperStyle={{}}>
                    <Card.Title>Log in your account</Card.Title>
                    <Card.Divider />
                    <View
                        style={{
                            position: "relative"
                        }}
                    >
                        <View style={styles.InputsContainer}>
                            <Input
                                ref={inputName}
                                placeholder='Name or e-mail'
                                leftIcon={{ type: 'font-awesome', name: 'user' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setname(value)}
                                errorMessage={ErrorVariableName}
                            />

                            <Input
                                ref={inputPassword}
                                placeholder="Password"
                                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                secureTextEntry={true}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setpassword(value)}
                                errorMessage={ErrorVariablePassword}
                            />

                            <CheckBox
                                center
                                title="Remember me"
                                checked={check}
                                onPress={() => setCheck(!check)}
                                containerStyle={{
                                    backgroundColor: 'rgb(240,240,240)',
                                    width: '100%',
                                    borderTopWidth: 1,
                                    borderTopColor: 'white',
                                    paddingTop: 15
                                }}
                            />

                        </View>

                        <Button
                            onPress={() => {
                                logIn()
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

export default LogScreen