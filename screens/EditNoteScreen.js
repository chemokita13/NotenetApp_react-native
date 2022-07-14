import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Input, Button, Card } from '@rneui/base';
import SearchableDropdown from 'react-native-searchable-dropdown';

import axios from 'axios'


const EditNoteScreen = ({ route }) => {

    const nav = useNavigation()

    const { note, User } = route.params // note to edit sent from NotesScreen
    if (!note.dest) {
        note.dest = 'any/none'
    }

    // inputs (title and description) refs
    const inputTitle = React.createRef()
    const inputDescription = React.createRef()


    const [Dests, setDests] = useState([]) // array with possible destinatary
    const [Title, setTitle] = useState('') // new title for the note
    const [Description, setDescription] = useState('') // new description for the note
    const [Destination, setDestination] = useState({}) // value for searchable and final destination

    const getDestinations = async () => { // get desinations user for searchable dropdown
        const res = await axios.post('https:/notenet.es/api/getDestinations')
        const data = await res.data
        const DestArray = data.status[1]
        const finalDest = [{ id: 0, name: 'any/none' }]
        var i = 0
        DestArray.forEach(element => {

            finalDest.push({ name: element, id: i })
            i += 1

        });
        setDests(finalDest)
    }

    const editNote = async () => {
        const sender = { user: User, note: { id: note._id } }

        if (Title) {
            sender.note.title = Title
        }
        if (Description) {
            sender.note.description = Description
        }
        if (Destination) {
            if (Destination.name == 'any/none') {Destination.name = 'none'}
            sender.note.destinatary = Destination.name
        }

        const res = await axios.post('https:/notenet.es/api/notes/edit', sender);
        const data = await res.data
        if (data.status[0]){
            // have to navigate to NotesScreen
            nav.navigate('Notes', { User, AlertNote: data.status[1] })
        }else{
            // error
            Alert.alert('Note error', data.status[1])
        }
    }

    useEffect(() => {
        getDestinations()
    }, [])

    return (
        <View style={styles.GeneralViewContainer}>
            <View style={{ marginTop: '25%' }}>
                <Card containerStyle={{ backgroundColor: '#fff' }} wrapperStyle={{}}>
                    <Card.Title>Edit note</Card.Title>
                    <Card.Divider />
                    <View
                        style={{
                            position: "relative"
                        }}
                    >
                        <View style={styles.InputsContainer}>
                            <Input
                                ref={inputTitle}
                                placeholder='Title'
                                //?leftIcon={{ type: 'font-awesome', name: 'text' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setTitle(value)}
                                defaultValue={note.title}
                                
                            />

                            <Input
                                ref={inputDescription}
                                placeholder="Description"
                                leftIconContainerStyle={{ marginRight: 10 }}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setDescription(value)}
                                defaultValue={note.description}
                            />

                            <SearchableDropdown
                                selectedItems={Destination}
                                //?onTextChange={(text) => console.log()}
                                //On text change listner on the searchable input
                                onItemSelect={(item) => setDestination(item)}
                                //onItemSelect called after the selection from the dropdown
                                containerStyle={{ padding: 5, width: '100%', }}
                                //suggestion container style
                                textInputStyle={{
                                    //inserted text style
                                    padding: 12,
                                    textAlign: 'center',
                                    borderWidth: 1,
                                    borderColor: 'rgb(230,230,230)',
                                    backgroundColor: 'rgb(240,240,240)',
                                }}
                                itemStyle={{
                                    //single dropdown item style
                                    backgroundColor: '#FAF9F8',
                                }}
                                itemTextStyle={{
                                    //text style of a single dropdown item
                                    color: '#222',
                                    textAlign: 'center'
                                }}
                                itemsContainerStyle={{
                                    //items container style you can pass maxHeight
                                    //to restrict the items dropdown hieght
                                    maxHeight: '50%',
                                    marginBottom: 0
                                }}
                                items={Dests}
                                //mapping of item array
                                defaultIndex={0}
                                //default selected item index
                                placeholder={`Select destination, (default: ${note.dest})`}
                                //reset textInput Value with true and false state
                                underlineColorAndroid="transparent"
                            //To remove the underline from the android input
                            />

                        </View>

                        <Button
                            onPress={() => {
                                editNote()
                            }}
                            buttonStyle={styles.ButtonGeneralStyle}
                        >

                            <Text style={styles.TextButtonLogIn}>
                                Save
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

export default EditNoteScreen