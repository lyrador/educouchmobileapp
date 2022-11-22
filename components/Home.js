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
  TouchableWithoutFeedback,
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
    // backgroundColor: "#7870C8",
    // alignItems: "center",
    // justifyContent: "center",
    alignItems: "center",
  },
  // logoContainer: {
  //   width: "100%",
  //   height: "100%",
  // },
  logo: {
    flex: 2,
    width: 300,
    height: 80,
    resizeMode: "contain",
  },
  containerButtons: {
    backgroundColor: "#fff",
    height: 80,
    width: 200,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  containerButtonTop: {
    marginBottom: 20
  },
  // logoContainer: {
  //   width: "100%",
  //   height: "100%",
  // },
  // title: {
  //   fontSize: 30,
  //   fontWeight: "300",
  // },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },
});

export default function Home({ navigation }) {
  // const [gamePin, onChangeGamePin] = React.useState("");
  // const [gamePinInputHeight, setGamePinInputHeight] = React.useState(200);
  // const [orInputHeight, setOrInputHeight] = React.useState(50);
  // const [joinButtonInputHeight, setJoinButtonInputHeight] = React.useState(100);
  // const [cameraButtonHeight, setCameraButtonInputHeight] = React.useState(100);
  // const [keyboardIsOpen, setKeyBoardIsOpen] = React.useState(false);

  // const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
  //   // setKeyBoardIsOpen(true);
  //   setGamePinInputHeight(140);
  //   // setOrInputHeight(65);
  //   // setCameraButtonInputHeight(100);
  // });
  // const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
  //   // setKeyBoardIsOpen(false);
  //   setGamePinInputHeight(140);
  //   // setOrInputHeight(75);
  //   // setCameraButtonInputHeight(100);
  // });

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: "Pin is required" });
      return false;
    } else if (formData.name.length < 6) {
      setErrors({ ...errors, name: "Pin is too short" });
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
          <Image
            style={styles.logo}
            source={{
              uri: "https://educouchbucket.s3.ap-southeast-1.amazonaws.com/neweducouchlogo.png",
            }}
          />
          <View style={{ flex: 3 }} alignItems="center">
            {/* <VStack width="300" height="200">
              <FormControl isRequired isInvalid={"name" in errors}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Game Pin
                </FormControl.Label>
                <Input
                  placeholder="Enter the game pin"
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
                    Enter the game pin shown on the screen!
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                Join
              </Button>
            </VStack> */}
            {/* <Button
              leftIcon={<Icon as={Ionicons} name="qr-code-outline" size="sm" />}
              size="md"
            >
              Scan QR
            </Button> */}
            <View style={styles.containerButtons}>
              <Button
                size="full"
                onPress={() =>
                  navigation.navigate("Enter your Name", { gameType: "TRIVIA" })
                }
                style={styles.containerButtonTop}
              >
                Play a Trivia!
              </Button>
              <Button
                size="full"
                onPress={() =>
                  navigation.navigate("Enter your Name", { gameType: "POLL" })
                }
              >
                Join a Poll!
              </Button>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    </NativeBaseProvider>
  );
}

{
  /* <Button
        title="Navigate to second screen with french"
        onPress={() => navigation.navigate("Second", { hello: "french" })}
      />
      <Button
        title="Navigate to second screen with english"
        onPress={() => navigation.navigate("Second", { hello: "eng" })}
      /> */
}

{
  /* <TextInput
          style={styles.input}
          onChangeText={onChangeGamePin}
          value={gamePin}
          placeholder="Enter the game pin here!"
        /> */
}
