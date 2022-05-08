import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SwitchSelector from "react-native-switch-selector";

export default function Info() {
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [image, setImage] = useState("");

  const [usdValue, setUsdValue] = useState(0);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const [object, setObject] = useState({});

  const [switchValue, setSwitchValue] = useState(false);

  useEffect(() => {
    async function getWeather() {
      // now the issue is that the image gets displayed before it fetches the link from the state ===>
      // how are temp and desc displayed then???????
      // await as a solution ????

      //think of how are you going to display days like tuesday - rainy
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=40.7306&lon=-73.9352&exclude=minutely,hourly,alerts&appid=8d809652bd875ee247fd32a4219904e4&units=metric"
      )
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.current.temp);
          setDescription(data.current.weather[0].description);
          setIcon(data.current.weather[0].icon);
        })
        .catch((err) => console.error(err));

      console.log(icon);
      setImage(`http://openweathermap.org/img/wn/${icon}@2x.png`);
      console.log(image);
    }

    getWeather();
  }, []);

  useEffect(() => {
    fetch(
      "http://api.exchangeratesapi.io/latest?access_key=64e464a5f3ab1fa7ae57da547feb0908"
    )
      .then((response) => response.json())
      .then((data) => setObject(data.rates))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }, []);

  console.log(object);
  //setRateArray(Object.keys(object))
  console.log(Object.keys(object));

  const convert = () => {
    const rate = object[currency];
    setUsdValue((amount / rate).toFixed(5));
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <SwitchSelector
          initial={0}
          onPress={(value) => setSwitchValue(value)}
          textColor="#232621"
          selectedColor="white"
          buttonColor="#8CD4C9"
          borderColor="#e0d1a3"
          hasPadding
          options={[
            { label: "Weather", value: true }, //images.feminino = require('./path_to/assets/img/feminino.png')
            { label: "Converter", value: false }, //images.masculino = require('./path_to/assets/img/masculino.png')
          ]}
        />
        {switchValue && (
          <View>
            <Text style={styles.header}>Weather</Text>
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
              }}
              style={styles.logo}
            />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.regularText}>{temperature} °C </Text>
              <Text style={styles.regularText}>{description}</Text>
            </View>
          </View>
        )}

        {!switchValue && (
          <View>
            <Text style={styles.header}>Currency converter</Text>
            <Text
              style={{
                fontSize: 22,
                marginBottom: 20,
                alignSelf: "center",
                color: "#e0d1a3",
                fontWeight: "bold",
              }}
            >
              {usdValue} €
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAmount(text)}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={currency}
                style={{ height: 50, width: 100, color: "#e0d1a3" }}
                onValueChange={(value) => setCurrency(value)}
              >
                {Object.keys(object).map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>
            <TouchableOpacity onPress={convert} style={styles.button}>
              <Text style={styles.buttonTitle}>convert</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
