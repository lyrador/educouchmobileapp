import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TriviaOptionsPage from "./components/TriviaOptionsPage";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import Home from "./components/Home";
import ThirdScreen from "./components/ThirdScreen";
import EnterName from "./components/EnterName";
import TriviaOptions from "./components/TriviaOptions";
import PollOptions from "./components/PollOptions";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "EduCouch Mobile",
            headerStyle: {
              backgroundColor: "dodgerblue",
            },
          }}
        />
        <Stack.Screen name="Second" component={TriviaOptionsPage} />
        <Stack.Screen
          name="Third"
          component={ThirdScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Enter your Name" component={EnterName} />
        <Stack.Screen
          name="Trivia Options"
          component={TriviaOptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Poll Options"
          component={PollOptions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const myIcon = <Icon name="rocket" size={30} color="#900" />;
