import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Button, Card } from '@rneui/base';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useNavigation } from '@react-navigation/native'


import axios from 'axios'

const NewNoteScreen = ({ route }) => {

    const nav = useNavigation()

    const inputTitle = React.createRef()
    const inputDescription = React.createRef()

    const { User } = route.params

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState('')
    const [TitleError, setTitleError] = useState('')
    const [Destination, setDestination] = useState('')
    const [DescriptionError, setDescriptionError] = useState('')
    const [dests, setDests] = useState([])


    const newNote = async () => { 
        if (Title && Description) {
            const note = { title: Title, description: Description }

            if (Destination.name != 'any/none'){ 
                note.destinatary = Destination.name
            }
           
            const res = await axios.post('https://notenet.es/api/notes/create', { user: User, note: note });
            const data = await res.data
            if (data.status[0]) {
                const AlertNote = data.status[1]
                nav.navigate('Notes', { User, AlertNote })
            } else {
                Alert.alert('Note error', data.status[1])
            }
        }else{
            if (!Title) {
                setTitleError('Title is required')
            }
            if (!Description) {
                setDescriptionError('Description is required')
            }
        }
    }

    const getDestinations = async () => {
        const res = await axios.post('https://notenet.es/api/getDestinations')
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

    useEffect(() => {
        getDestinations()
    }, [])


    return (
        <View style={styles.GeneralViewContainer}>
            <View style={{ marginTop: '25%' }}>
                <Card containerStyle={{ backgroundColor: '#fff' }} wrapperStyle={{}}>
                    <Card.Title>Create a new note</Card.Title>
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
                                errorMessage={TitleError}
                            />

                            <Input
                                ref={inputDescription}
                                placeholder="Description"
                                leftIconContainerStyle={{ marginRight: 10 }}
                                errorStyle={{ color: 'red' }}
                                onChangeText={async (value) => await setDescription(value)}
                                errorMessage={DescriptionError}
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
                                    //padding: 10,
                                    //marginTop: 2,
                                    backgroundColor: '#FAF9F8',
                                    //borderColor: '#bbb',
                                    //borderWidth: 1,
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
                                items={dests}
                                //mapping of item array
                                defaultIndex={0}
                                //default selected item index
                                placeholder="Select destination"
                                //place holder for the search input
                                ///resetValue={false}
                                //reset textInput Value with true and false state
                                underlineColorAndroid="transparent"
                            //To remove the underline from the android input

                            />

                        </View>

                        <Button
                            onPress={() => {
                                newNote()
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

export default NewNoteScreen