import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232621",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    //flex: 1,
    height: 150,
    width: 250,
    alignSelf: "center",
    margin: 30,
    marginTop: 70,
  },
  map: {
    flex: 10,
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    marginTop: 150,
    height: 500,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#8CD4C9",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#232621",
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
  },
  input: {
    height: 40,
    //fontSize: 16,
    //width: 300,
    borderWidth: 1,
    borderRadius: 3,
    //overflow: "hidden",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#e0d1a3",
    //color: "black",
    backgroundColor: "#e0d1a3",
    paddingLeft: 20,
  },
  header: {
    fontSize: 26,
    color: "#8CD4C9",
    fontStyle: "italic",
    fontWeight: "400",
    margin: 20,
    borderBottomColor: "#8CD4C9",
    borderBottomWidth: 3,
  },
  regularText: {
    color: "#e0d1a3",
    fontSize: 18,
    margin: 5,
  },

  eventBox: {
    backgroundColor: "#e0d1a3",
  },

  eventTitle: {},

  eventInfo: {},
});
