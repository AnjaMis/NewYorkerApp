import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { auth } from "../firebase/config";

export default function MyAccount({ navigation }) {
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
        <Text style={styles.header}>My Account</Text>
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
