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
import dayjs from "dayjs";
import { Icon } from "react-native-elements";
import { auth, db } from "../firebase/config";
import { ref, child, get, set } from "firebase/database";

export default function News() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      fetch(
        "https://api.seatgeek.com/2/events?venue.city=NY&client_id=MjY2MTk2NjN8MTY1MDMxMTA3My4yODIxODM2&client_secret=2cd6ab0fb5d15f6a38147b5e96cd90cdeb4a1a9642187dfe8d2ac67de6778692&datetime_utc.gte=2022-05-01&datetime_utc.lte=2022-05-31"
      )
        .then((response) => response.json())
        .then((data) => {
          setEvents(data.events);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    getEvents();
  }, []);

  const addToFavorites = (event) => {
    const uid = auth.currentUser.uid;
    const eventId = event.id;
    const eventInfo = {
      eventTitle: event.title,
    };

    const dbRef = ref(db);
    get(child(dbRef, `users/${uid}/events/${eventId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          Alert.alert("Alert", "Event already saved");
        } else {
          set(ref(db, "users/" + uid + "/events/" + eventId), eventInfo);
          Alert.alert("Event saved");
          console.log("event saved");
          () => showToast();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.header}>Events</Text>

        {events.map((event) => (
          <View style={styles.eventBox}>
            <Text style={styles.eventTitle}> {event.title}</Text>
            <Text style={styles.eventLocation}>
              {" "}
              <Icon
                type="ionicon"
                name="location-outline"
                color="#232621"
                size={20}
              />{" "}
              {event.venue.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.eventDate}>
                <Icon
                  type="ionicon"
                  name="calendar-outline"
                  color="#232621"
                  size={20}
                />{" "}
                {dayjs(event.datetime_utc).format("DD/MM/YY")}
              </Text>

              <TouchableOpacity onPress={() => addToFavorites(event)}>
                <Text style={{ marginLeft: 150 }}>
                  <Icon
                    type="ionicon"
                    name="heart-outline"
                    color="#232621"
                    size={50}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}
