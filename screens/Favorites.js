import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { auth, db } from "../firebase/config";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Favorites({ navigation }) {
  const [userData, setUserData] = useState("");
  const [savedEvents, setSavedEvents] = useState([]);

  const dbRef = ref(db);
  const userId = auth.currentUser.uid;

  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        setSavedEvents(snapshot.val().events);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(savedEvents);

  const Item = ({ title }) => (
    <View style={styles.eventBox}>
      <Text style={styles.eventTitle}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.eventTitle} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.eventIid}
      />
    </SafeAreaView>
  );
}
