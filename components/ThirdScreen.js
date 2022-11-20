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

export default function ThirdScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Third</Text>
      <Button title="Pop to root" onPress={() => navigation.popToTop()} />
      <Button title="Pop to root" onPress={() => navigation.pop()} />
      <StatusBar style="auto" />
    </View>
  );
}
