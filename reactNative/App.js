import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  FlatList,
  Button,
  Linking,
} from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  HStack,
  ScrollView,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import * as Contacts from "expo-contacts";
import CalendarApp from "./calendar.js";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const access = await Contacts.requestPermissionsAsync();
    if (access.granted) {
      const contactsData = await Contacts.getContactsAsync();
      setContacts(contactsData.data);
    }
  };

  const call = (contacts) => {
    console.log(contacts);
    let phoneNumber = contacts.phoneNumbers[0].number;
    console.log(phoneNumber);

    const link = `tel${phoneNumber}`;
    Linking.canOpenURL(link)
      .then((supported) => Linking.openURL(link))
      .catch(console.error);
  };

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <NativeBaseProvider config={config}>
      <Box
        bg={{
          linearGradient: {
            colors: ["lightBlue.300", "violet.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <SafeAreaView>
          <Heading size="xl" m="5" textAlign="center">
            My Contacts
          </Heading>

          <CalendarApp />

          <ScrollView mb="175">
            <FlatList
              data={contacts}
              keyExtractor={(contact) => contact.id}
              renderItem={({ item }) => (
                <Button title={item.name} onPress={() => call(item)} />
              )}
            />
          </ScrollView>

          <StatusBar style="auto" />
        </SafeAreaView>
      </Box>
    </NativeBaseProvider>
  );
}
