import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import News from "./screens/News";
import Maps from "./screens/Maps";
import MyAccount from "./screens/MyAccount";
import Info from "./screens/Info";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Tab.Navigator
      //initialRouteName={Home}
      screenOptions={{
        tabBarStyle: { backgroundColor: "#232621" },

        drawerLabelStyle: {
          color: "#fff",
        },
        drawerActiveTintColor: {
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#232621",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarOptions: {
            activeTintColor: "white",
            inactiveTintColor: "#fff",
          },
          tabBarIcon: () => (
            <Icon type="material" name="home" color="#e0d1a3" />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          //tabBarLabel: "Info",
          tabBarIcon: () => (
            <Icon type="material" name="info" color="#e0d1a3" />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          //tabBarLabel: "Maps",
          tabBarIcon: () => <Icon type="material" name="map" color="#e0d1a3" />,
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          //tabBarLabel: "News",
          tabBarIcon: () => (
            <Icon type="material" name="book" color="#e0d1a3" />
          ),
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          //tabBarLabel: "My Account",
          tabBarIcon: () => (
            <Icon type="material" name="person" color="#e0d1a3" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
