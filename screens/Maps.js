import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";

export default function Maps() {
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 40.73061,
    longitude: -73.935242,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });

  const showAddress = () => {
    if (address) {
      const url =
        "http://www.mapquestapi.com/geocoding/v1/address?key=VyG0oKImNWGL24LXXEAtp5PDBdSoGo1A&location=" +
        address;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setRegion({
            ...region,
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        });
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          onChangeText={(address) => setAddress(address)}
        />
        <TouchableOpacity onPress={showAddress} style={styles.button}>
          <Text style={styles.buttonTitle}>
            {" "}
            <Icon type="ionicon" name="search" color="#232621" size={20} />
            {"  "} FIND
          </Text>
        </TouchableOpacity>
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
      </KeyboardAwareScrollView>
    </View>
  );
}
