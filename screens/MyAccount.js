import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { auth, db } from "../firebase/config";
import { getDatabase, ref, child, get } from "firebase/database";

export default function MyAccount({ navigation }) {
  const [userData, setUserData] = useState("");

  const dbRef = ref(db);
  const userId = auth.currentUser.uid;

  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        setUserData(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header}>Hello {userData.name}!</Text>
        <Text style={{ alignSelf: "center" }}>
          <Icon type="ionicon" name="person" color="#e0d1a3" size={200} />
        </Text>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonTitle}>Log out </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
