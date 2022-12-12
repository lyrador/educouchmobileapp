import { StackActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function TriviaOptionsPage({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <Button
        title="Go to Third Screen"
        onPress={() => navigation.push("Third")}
      />
      <Button
        title="Go to Third Screen with Replace"
        onPress={() => {
          navigation.dispatch(StackActions.replace("Third"));
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
