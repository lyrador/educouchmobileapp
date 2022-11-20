import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  // Button,
  Image,
  TextInput,
  onChangeText,
  Keyboard,
} from "react-native";
import {
  Input,
  FormControl,
  WarningOutlineIcon,
  Box,
  Center,
  NativeBaseProvider,
  KeyboardAvoidingView,
  Button,
  Icon,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DismissKeyboard from "./DismissKeyboard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    flex: 2,
    width: 300,
    height: 80,
    resizeMode: "contain",
  },
});

export default function EnterName({ navigation, route }) {
  let gameType = route.params.gameType;
  //   const [gamePin, onChangeGamePin] = React.useState("");
  //   const [gamePinInputHeight, setGamePinInputHeight] = React.useState(200);

  //   const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
  //     setGamePinInputHeight(140);
  //   });
  //   const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
  //     setGamePinInputHeight(140);
  //   });

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: "Nickname is required" });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <NativeBaseProvider>
      <DismissKeyboard>
        <View style={styles.container}>
          {gameType == "TRIVIA" && (
            <Image
              style={styles.logo}
              source={{
                uri: "https://www.psd.gov.sg/images/default-source/challenge-library/lifestyle/trivia-quiz/quiz-trivia-edm/trivia-quiz-yellow-main-720x400.jpg",
              }}
            />
          )}
          {gameType == "POLL" && (
            <Image
              style={styles.logo}
              source={{
                uri: "https://www.biospace.com/getasset/eb76c087-5532-49e0-9620-4d63795c1347",
              }}
            />
          )}
          <View style={{ flex: 3 }} alignItems="center">
            <VStack width="300" height="200">
              <FormControl isRequired isInvalid={"name" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Name
                </FormControl.Label>
                <Input
                  placeholder="johntheking"
                  onChangeText={(value) =>
                    setData({ ...formData, name: value })
                  }
                />
                {"name" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Enter your nickname!
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Start
              </Button>
            </VStack>
            {gameType == "TRIVIA" && (
              <Button
                size="md"
                onPress={() =>
                  navigation.navigate("Trivia Options", { hello: "french" })
                }
              >
                Testing: Proceed to Trivia Options
              </Button>
            )}
            {gameType == "POLL" && (
              <Button
                size="md"
                onPress={() =>
                  navigation.navigate("Poll Options", { hello: "french" })
                }
              >
                Testing: Proceed to Poll Options
              </Button>
            )}
          </View>
        </View>
      </DismissKeyboard>
    </NativeBaseProvider>
  );
}
