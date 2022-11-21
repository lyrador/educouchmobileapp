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

import io from "socket.io-client";

const socket = io.connect("http://192.168.0.101:3001")

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

  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [haveError, setHaveError] = React.useState(false);
  const [invalidRoom, setInvalidRoom] = React.useState(false);

  const joinRoom = () => {
    console.log(room)
    const data = {
      room: room,
      author: username,
    }
    socket.emit("join_room", data)
  }

  // const checkRoom = () => {
  //   console.log(room)
  //   const data = {
  //     room: room,
  //     author: username,
  //   }
  //   socket.emit("check_room", data)
  // }

  // React.useEffect(() => {
  //   socket.on("receive_invalid_room_learner", (data) => {
  //     if (data.author == username) {
  //       if (data.validity == true) {
  //         setInvalidRoom(false)
  //       } else {
  //         setInvalidRoom(true)
  //       }
  //     }
  //   })
  // }, [socket])

  const validate = () => {
    if (username === undefined || username === "") {
      setErrors({ ...errors, name: "Nickname is required" });
      setHaveError(true)
    }
    if (room === undefined || room === "") {
      setErrors({ ...errors, room: "Pin is required" });
      setHaveError(true)
    } else if (room.length < 6) {
      setErrors({ ...errors, room: "Pin is too short" });
      setHaveError(true)
    }
    // if (invalidRoom) {
    //   setErrors({ ...errors, room: "No such active game!" });
    //   setHaveError(true)
    // }

    if (haveError) {
      setHaveError(false)
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    // checkRoom()
    if (validate()) {
      console.log("Submitted")
      joinRoom()
      navigation.navigate("Trivia Options", { socket: socket, username: username, room: room })
    } else {
      console.log("Validation Failed");
    }
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
                  Game Pin
                </FormControl.Label>
                <Input
                  placeholder="T00000"
                  onChangeText={(value) =>
                    setRoom(value)
                  }
                />
                {"room" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.room}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Enter your room!
                  </FormControl.HelperText>
                )}
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
                    setUsername(value)
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
                Join
              </Button>
            </VStack>
            {/* {gameType == "TRIVIA" && (
              <Button
                size="md"
                onPress={() =>
                  navigation.navigate("Trivia Options", { hello: "french" })
                }
              >
                Testing: Proceed to Trivia Options
              </Button>
            )} */}
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
