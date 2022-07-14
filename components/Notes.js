import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Button, Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/native'

import axios from 'axios'


const Notes = ({ note, User, action }) => {

  const nav = useNavigation()

  const apiDeleteNote = async (id) => {
    const res = await axios.post('https:/notenet.es/api/notes/delete', { user: User, "note": { "id": id } });
    const data = await res.data
    Alert.alert('Note Alert', data.status[0]);
  }

  return (

    <View style={{ marginTop: '1%' }}>
      <Card containerStyle={{ backgroundColor: '#fff' }} wrapperStyle={{}}>
        <Card.Title>{note.title}</Card.Title>
        <Card.Divider />
        <View
          style={{
            position: "relative"
          }}
        >
          <Text style={{ marginBottom: 20 }}>{note.description}</Text>
          <Card.Divider />
          <View style={{ flexDirection: 'row', margin: 1 }}>
            <Button
              onPress={() => { apiDeleteNote(note._id), action.setter('easterEggXd') }}
              buttonStyle={styles.DeleteButtonChildren}
            >
              <Text style={styles.TextButtonLogIn}>
                Delete
              </Text>
            </Button>
            <Button
              onPress={() => {
                if (note.editable || User.name == 'admin' || note.title.startsWith('//private')) {
                  nav.navigate('Edit note', { note, User })
                }else{
                  Alert.alert("note not editable", note.editable)
                }
              }}
              buttonStyle={styles.EditButtonChildren}
            >
              <Text style={styles.TextButtonLogIn}>
                Edit
              </Text>
            </Button>
          </View>
        </View>
      </Card>
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
  EditButtonChildren: {
    backgroundColor: '#071220',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  DeleteButtonChildren: {
    backgroundColor: '#e12e1c',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  }
})

export default Notes