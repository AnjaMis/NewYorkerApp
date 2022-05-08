import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

export default function News() {
  const [events, setEvents] = useState([]);

  var eventTitles = [];
  var eventDates = [];
  var eventLocations = [];

  useEffect(() => {
    async function getEvents() {
      fetch(
        "https://api.seatgeek.com/2/events?venue.city=NY&client_id=MjY2MTk2NjN8MTY1MDMxMTA3My4yODIxODM2&client_secret=2cd6ab0fb5d15f6a38147b5e96cd90cdeb4a1a9642187dfe8d2ac67de6778692&datetime_utc.gte=2022-05-01&datetime_utc.lte=2022-05-31"
      )
        .then((response) => response.json())
        .then((data) => {
          setEvents(data.events);
          console.log("LOOK ", events);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    getEvents();
    console.log("total 2  ", events.length);
  }, []);

  console.log("total  ", events.length);

  const showEvents = () => {
    for (var i = 0; i < events.length; i++) {
      eventTitles.push(events[i].title);
      eventDates.push(events[i].datetime_utc);
      eventLocations.push(events[i].venue.name);
    }

    console.log("TITLES ", eventTitles.length);
    console.log("DATES ", eventDates.length);
    console.log("LOCATIONS ", eventLocations.length);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header}>Events</Text>

        <View>
          <Text>Title</Text>
          {/* <Image source={require("../assets/NewYorker2.png")} /> */}
          <View>
            <Text>Date</Text>
            <Text>Location</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => showEvents()}>
          <Text style={styles.buttonTitle}>See events </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
