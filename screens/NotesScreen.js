import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react'
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native'

import axios from 'axios'

import Notes from '../components/Notes'


// * Requires an user and (optional) an alertnote
const NotesScreen = ({ route, ButtonToggle }) => {

    const nav = useNavigation()

    if (ButtonToggle){
        nav.navigate('User Settings')
    }

    const { User } = route.params

    const [refreshing, setRefreshing] = useState(false)
    const [Allnotes, setNotes] = useState([])
    const [buttonChange, setButtonChange] = useState(null)

    const apiGetNotes = async (user) => {

        const res = await axios.post('https://notenet.es/api/notes', { user: user });
        const data = await res.data
        await setNotes(data.status[2])

    }

    // ? I don't know why but the function doesn't works with await
    const z = async () => await apiGetNotes(User);


    //? i don't now why but if works don't touch it
    const command = {}
    command.setter = (x) => setButtonChange(x)

    if (buttonChange) {

        z()
        setButtonChange(null)

    }


    if (route.params.AlertNote) {

        z()
        Alert.alert('Note alert', route.params.AlertNote)
        route.params.AlertNote = null

    }



    useEffect(() => {

        z()

    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#141414' />
            <View>
            <Button
                type={'outline'}
                    title={'GET LINK'}
                    buttonStyle={{ padding:10, marginTop: 20, marginHorizontal: 25, textAlign: 'center', marginBottom: 1 }}
                    onPress={() => { return (<Button
                        title={'New note'}
                        buttonStyle={{ padding:15, marginTop: 20, marginHorizontal: 15, textAlign: 'center', marginBottom: 15 }}
                        onPress={() => { nav.navigate('New note', { User }) }}
                    /> )}}
                />
                <Button
                    title={'New note'}
                    buttonStyle={{ padding:15, marginTop: 20, marginHorizontal: 25, textAlign: 'center', marginBottom: 15 }}
                    onPress={() => { nav.navigate('New note', { User }) }}
                />
                <FlatList
                    style={styles.list}
                    data={Allnotes}
                    renderItem={({ item }) => {
                        return <Notes note={item} User={User} action={command} />
                    }}
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true)
                        await apiGetNotes(User)
                        setRefreshing(false)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(7,12,20)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default NotesScreen