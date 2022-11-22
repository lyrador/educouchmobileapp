import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  //   Button,
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
  TouchableHighlight,
  Menu,
  HamburgerIcon,
  Pressable,
  Heading,
  TextArea,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import TriviaCards from "./TriviaCards";
import DismissKeyboard from "./DismissKeyboard";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "pink",
    // alignItems: "center",
    width: "100%",
    height: "80%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 800,
  },
  box: {
    width: "50%",
    height: "50%",
    padding: 5,
  },
  inner: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: "6%",
    width: "100%",
    height: "8%",
    minHeight: 55,
    backgroundColor: "#eee",
    borderColor: "lightgrey",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    // marginTop: "2%",
    width: "100%",
    height: "8%",
    backgroundColor: "#eee",
    borderColor: "lightgrey",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
});

export default function PollOptions({ navigation, route }) {
  let socket = route.params.socket;
  let room = route.params.room;
  let username = route.params.username;

  const sendPollResponse = () => {
    const pollerResponse = {
      author: username,
      response: textAreaValue,
      room: room
    }
    socket.emit("send_poll_response", pollerResponse)
  }

  React.useEffect(() => {
    socket.on("receive_poll_question", (data) => {
      console.log("receive poll question")
      setCurrentQuestion(data.question)
    })
  }, [socket])

  const [textAreaValue, setTextAreaValue] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [errors, setErrors] = React.useState({});


  const validate = () => {
    if (textAreaValue === undefined || textAreaValue === "") {
      setErrors({ ...errors, responseText: "Response cannot be empty!" });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (validate()) {
      console.log("VALIDATED")
      sendPollResponse()
    } else {
      console.log("Validation Failed");
    }
  };

  return (
    <NativeBaseProvider>
      <DismissKeyboard>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.header}>
            <Box style={{ position: "absolute", left: 0, paddingLeft: 10 }}>
              <Menu
                w="190"
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <HamburgerIcon />
                    </Pressable>
                  );
                }}
              >
                <Menu.Item onPress={() => navigation.popToTop()}>
                  Leave Poll
                </Menu.Item>
              </Menu>
            </Box>
            <Box>
              <Heading size="sm">Poll</Heading>
            </Box>
            <Box style={{ position: "absolute", right: 0, paddingRight: 10 }}>
              <Text>{room}</Text>
            </Box>
          </View>
          <SafeAreaView style={styles.container}>
            <View style={{ padding: 5, width: "100%" }}>
              <Heading size="sm">
                {currentQuestion}
              </Heading>
              <VStack width="100%" height="200" paddingTop="2">
                <FormControl isRequired isInvalid={"responseText" in errors}>
                  <TextArea
                    value={textAreaValue}
                    onChangeText={(text) => setTextAreaValue(text)}
                    backgroundColor="white"
                    placeholder="Enter a response"
                  />
                  {"responseText" in errors ? (
                    <FormControl.ErrorMessage>
                      {errors.responseText}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText></FormControl.HelperText>
                  )}
                </FormControl>
                <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                  Submit
                </Button>
              </VStack>
            </View>
          </SafeAreaView>
          <View style={styles.footer}>
            <Box style={{ position: "absolute", left: 0, paddingLeft: 10 }}>
              <Heading size="xs">Responding as: </Heading>
              <Heading size="sm">{username}</Heading>
            </Box>
          </View>
        </View>
      </DismissKeyboard>
    </NativeBaseProvider>
  );
}
