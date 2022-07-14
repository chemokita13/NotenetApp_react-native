import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@rneui/base';
import { useState } from 'react';

import NotesScreen from './screens/NotesScreen'
import LogScreen from './screens/LogScreen'
import NewNoteScreen from './screens/NewNoteScreen'
import EditNoteScreen from './screens/EditNoteScreen'
import StartScreen from './screens/StartScreen'
import CreateUserScreen from './screens/CreateUserScreen'
import UserSettingsScreen from './screens/UserSettingsScreen'

export default function App() {

  const Stack = createNativeStackNavigator();

  const [ButtonToggle, setButtonToggle] = useState(false)


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#adb5bd', alignItems: 'center', textAlign: 'center' } }}>
        <Stack.Screen
          name='Start'
          component={StartScreen}
          options={{
            title: 'NoteNet',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='New User'
          component={CreateUserScreen}
          options={{
            title: 'NoteNet',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='Log'
          component={LogScreen}
          options={{
            title: 'NoteNet',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='Notes'
          options={{
            headerRight: () => (
              <Button
                type={'outline'}
                title={'My account'}
                buttonStyle={{ padding: 10, marginTop: 20, marginHorizontal: 25, textAlign: 'center', marginBottom: 1 }}
                onPress={() => { setButtonToggle(!ButtonToggle) }}
              />
            ),
          }}
        >
          {(props) => <NotesScreen {...props} ButtonToggle={ButtonToggle} />}
        </Stack.Screen>
        <Stack.Screen name='New note' component={NewNoteScreen} />
        <Stack.Screen name='Edit note' component={EditNoteScreen} />
        <Stack.Screen name='User Settings' component={UserSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

