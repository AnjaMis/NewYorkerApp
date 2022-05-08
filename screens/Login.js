import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { firebase } from "../firebase/config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.button}
          //onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTitle}>Log in </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
