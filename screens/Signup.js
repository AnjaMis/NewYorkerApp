import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("HomeStack");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const signUp = () => {
    if (password === confirmedPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const uid = userCredential.user.uid;
          const data = {
            // id: uid,
            email,
            name,
          };

          set(ref(db, "users/" + uid), data);
          // const docRef = await addDoc(collection(db, "Users"), data);

          navigation.navigate("HomeStack");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, " code: ", errorCode);
          // ..
        });
    } else {
      Alert.alert("passwords not matching");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={require("../assets/NewYorker2.png")}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Full name"
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={(text) => setConfirmedPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonTitle}>Sign up </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
