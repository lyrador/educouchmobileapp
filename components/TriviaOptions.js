import React from "react";
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
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import TriviaCards from "./TriviaCards";
import TriviaWaitingPage from "./TriviaWaitingPage";
import TriviaCorrectAnswer from "./TriviaCorrectAnswer";
import TriviaWrongAnswer from "./TriviaWrongAnswer";
import TriviaFinishLeaderboard from "./TriviaFinishLeaderboard";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    width: "100%",
    height: "80%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
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
  //   container: {
  //     // flex: 1,
  //     backgroundColor: "#fff",
  //     // alignItems: "center",
  //     width: "100%",
  //     height: "80%",
  //     padding: 5,
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //   },
});

export default function TriviaOptions({ navigation, route }) {
  let gameType = route.params.gameType;

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [yellowIsPressed, setYellowIsPressed] = React.useState(false);
  const [greenIsPressed, setGreenIsPressed] = React.useState(false);
  const [redIsPressed, setRedIsPressed] = React.useState(false);
  const [blueIsPressed, setBlueIsPressed] = React.useState(false);

  const [openWaitingPage, setOpenWaitingPage] = React.useState(true);
  const [openCorrectAnswer, setOpenCorrectAnswer] = React.useState(false);
  const [openWrongAnswer, setOpenWrongAnswer] = React.useState(false);
  const [openFinishLeaderboard, setOpenFinishLeaderboard] =
    React.useState(false);

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
              Leave Game
            </Menu.Item>
          </Menu>
        </Box>
        <Box>
          <Heading size="sm">Trivia</Heading>
        </Box>
        <Box style={{ position: "absolute", right: 0, paddingRight: 10 }}>
          <Text>1 of 20</Text>
        </Box>
      </View>
      {openWaitingPage == false &&
        openCorrectAnswer == false &&
        openWrongAnswer == false &&
        openFinishLeaderboard == false && (
          <TriviaCards
            yellowIsPressed={yellowIsPressed}
            setYellowIsPressed={setYellowIsPressed}
            greenIsPressed={greenIsPressed}
            setGreenIsPressed={setGreenIsPressed}
            redIsPressed={redIsPressed}
            setRedIsPressed={setRedIsPressed}
            blueIsPressed={blueIsPressed}
            setBlueIsPressed={setBlueIsPressed}
            openWaitingPage={openWaitingPage}
            setOpenWaitingPage={setOpenWaitingPage}
            openFinishLeaderboard={openFinishLeaderboard}
            setOpenFinishLeaderboard={setOpenFinishLeaderboard}
          />
        )}
      {openWaitingPage == true && (
        <TriviaWaitingPage
          openWaitingPage={openWaitingPage}
          setOpenWaitingPage={setOpenWaitingPage}
          openCorrectAnswer={openCorrectAnswer}
          setOpenCorrectAnswer={setOpenCorrectAnswer}
          openWrongAnswer={openWrongAnswer}
          setOpenWrongAnswer={setOpenWrongAnswer}
          openFinishLeaderboard={openFinishLeaderboard}
          setOpenFinishLeaderboard={setOpenFinishLeaderboard}
        />
      )}
      {openCorrectAnswer == true && (
        <TriviaCorrectAnswer
          openWaitingPage={openWaitingPage}
          setOpenWaitingPage={setOpenWaitingPage}
          openCorrectAnswer={openCorrectAnswer}
          setOpenCorrectAnswer={setOpenCorrectAnswer}
          openFinishLeaderboard={openFinishLeaderboard}
          setOpenFinishLeaderboard={setOpenFinishLeaderboard}
          navigation={navigation}
        />
      )}
      {openWrongAnswer == true && (
        <TriviaWrongAnswer
          openWaitingPage={openWaitingPage}
          setOpenWaitingPage={setOpenWaitingPage}
          openWrongAnswer={openWrongAnswer}
          setOpenWrongAnswer={setOpenWrongAnswer}
          openFinishLeaderboard={openFinishLeaderboard}
          setOpenFinishLeaderboard={setOpenFinishLeaderboard}
          navigation={navigation}
        />
      )}
      {openFinishLeaderboard == true && (
        <TriviaFinishLeaderboard
          openWaitingPage={openWaitingPage}
          setOpenWaitingPage={setOpenWaitingPage}
          openFinishLeaderboard={openFinishLeaderboard}
          setOpenFinishLeaderboard={setOpenFinishLeaderboard}
          navigation={navigation}
        />
      )}
      <View style={styles.footer}>
        <Box style={{ position: "absolute", left: 0, paddingLeft: 10 }}>
          <Heading size="sm">Waryl</Heading>
        </Box>
        <Box
          style={{
            position: "absolute",
            right: 0,
            paddingRight: 10,
          }}
        >
          <Box
            style={{
              padding: 8,
              backgroundColor: "#353535",
            }}
          >
            <Heading size="md" style={{ color: "white" }}>
              234543
            </Heading>
          </Box>
        </Box>
      </View>
    </NativeBaseProvider>
  );
}

{
  /* <Icon as={Ionicons} name="star-outline" size="10xl" height="50" /> */
}
