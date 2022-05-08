import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function MyAccount() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>MyAccount</Text>
      <StatusBar style="auto" />
    </View>
  );
}
