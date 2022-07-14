import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Card } from '@rneui/base'
import AsyncStorage from '@react-native-async-storage/async-storage';


const StartScreen = () => {

    const nav = useNavigation()

    const checkLocalStorage = async () => {
        const UserSaved = await AsyncStorage.getItem('user') 
        if (UserSaved) {
            let User = JSON.parse(UserSaved)
            nav.navigate('Notes', { User })
        }
    }

    useEffect(() => {

        checkLocalStorage()

    }, [])

    return (
        <View style={styles.allPage}>
            <View style={styles.cardView}>
                <Card containerStyle={styles.card}>
                    <Card.Title>Welcome to NoteNet</Card.Title>
                    <Card.Divider color='rgb(7,12,20)' />
                    <View>
                        <Button
                            icon={{ type: 'font-awesome', name: 'user' }}
                            iconRight={true}
                            iconContainerStyle={{ marginLeft:'50%' }}
                            containerStyle={styles.containerButtonLogIn}
                            buttonStyle={styles.buttonStyleLogIn}
                            onPress={() => { nav.navigate('Log') }}
                        >
                            Log in
                        </Button>
                        <Button
                            type='clear'
                            icon={{ type: 'font-awesome', name: 'user-plus' }}
                            iconRight={true}
                            iconContainerStyle={{ marginLeft:'30%' }}
                            containerStyle={styles.containerButtonLogIn}
                            buttonStyle={styles.buttonStyleCreateAccount}
                            onPress={() => { nav.navigate('New User') }}
                        >
                            <Text style={styles.TextButtonCreateAccount}>
                                Create account
                            </Text>
                        </Button>
                    </View>
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    allPage: {
        height: '100%',
        backgroundColor: 'rgb(7,12,20)'
    },
    cardView: {
        marginTop: '45%'
    },
    card: {
        backgroundColor: 'rgb(240,240,240)'
    },
    containerButtonLogIn: {
        margin: '2%',
        borderWidth: 1,
        borderColor: "rgb(180,180,180)",
    },
    buttonStyleLogIn: {
        backgroundColor: 'rgb(10,130,230)',
        border: 5,
        borderColor: 'rgb(0,0,0)',
    },
    buttonStyleCreateAccount: {
        borderColor: 'rgb(0,0,255)'
    },
    TextButtonCreateAccount: {
        color: 'rgb(10,130,230)',
        fontSize: 16,
        fontFamily: 'sans-serif',
        paddingVertical: 1
    }

})

export default StartScreen