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

export default function News() {
  const [events, setEvents] = useState([]);
  const [saved, setSaved] = useState(false);

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

              <TouchableOpacity onPress={() => setSaved(true)}>
                <Text style={{ marginLeft: 150 }}>
                  {saved && (
                    <Icon
                      type="ionicon"
                      name="heart"
                      color="#232621"
                      size={50}
                    />
                  )}
                  {!saved && (
                    <Icon
                      type="ionicon"
                      name="heart-outline"
                      color="#232621"
                      size={50}
                    />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </KeyboardAwareScrollView>
    </View>
  );
}
