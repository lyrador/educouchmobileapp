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

import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

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
  let socket = route.params.socket;
  let room = route.params.room;
  let username = route.params.username;

  React.useEffect(() => {
    socket.on("receive_start_game", (data) => {
      console.log("GAME START")
      console.log(data)
      setQuestionType(data.questionType)
      setQuestionCounter(data.questionNumber)
      setNumOfQuestions(data.numOfQuestions)
      setOpenWaitingPage(false)
      setOpenCorrectAnswer(false)
      setOpenWrongAnswer(false)
    })
    socket.on("receive_answer_and_score", (data) => {
      console.log("RECEIVE ANSWER AND SCORE")
      console.log(data)
      if (data.author == username) {
        if (data.submitted == true) {
          setCurrentQuestionScore(data.score)
          console.log("TOTAL SCORE BEFORE ADDING: " + totalScoreVariable)
          totalScoreVariable = totalScoreVariable + data.score
          console.log("TOTAL SCORE AFTER ADDING: " + totalScoreVariable)
          setTotalScore(totalScoreVariable)
          if (data.score == 0) {
            setOpenWrongAnswer(true);
            setOpenWaitingPage(false);
          } else {
            setOpenCorrectAnswer(true);
            setOpenWaitingPage(false);
          }
          setYellowIsPressed(false)
          setGreenIsPressed(false)
          setRedIsPressed(false)
          setBlueIsPressed(false)
        } else if (data.submitted == false) {
          setCurrentQuestionScore(0)
          setOpenWrongAnswer(true);
          setOpenWaitingPage(false);
        }
      }
    })
    socket.on("receive_leaderboard", (data) => {
      if (data.author == username) {
        console.log("receive_leaderboard")
        handleOpenLeaderboard(data)
      }
    })
  }, [socket])

  const handleOpenLeaderboard = (data) => {
    setLeaderboardData(data)
    setOpenWrongAnswer(false);
    setOpenCorrectAnswer(false);
    setOpenFinishLeaderboard(true)
  }

  const handleYellowClick = () => {
    setYellowIsPressed(true);
    setOpenWaitingPage(true);
    console.log("Sending Yellow")
    var timeInMs = +new Date()
    const data = {
      room: room,
      username: username,
      optionNumber: 1,
      time: timeInMs
    }
    console.log(timeInMs)
    socket.emit("send_response", data)
    // setYellowIsPressed(false)
  };

  const handleGreenClick = () => {
    setGreenIsPressed(true);
    setOpenWaitingPage(true);
    console.log("Sending Green")
    var timeInMs = +new Date()
    const data = {
      room: room,
      username: username,
      optionNumber: 2,
      time: timeInMs
    }
    socket.emit("send_response", data)
    // setGreenIsPressed(false)
  };

  const handleRedClick = () => {
    setRedIsPressed(true);
    setOpenWaitingPage(true);
    console.log("Sending Red")
    var timeInMs = +new Date()
    const data = {
      room: room,
      username: username,
      optionNumber: 3,
      time: timeInMs
    }
    socket.emit("send_response", data)
    // setRedIsPressed(false)
  };

  const handleBlueClick = () => {
    setBlueIsPressed(true);
    setOpenWaitingPage(true);
    console.log("Sending Blue")
    var timeInMs = +new Date()
    const data = {
      room: room,
      username: username,
      optionNumber: 4,
      time: timeInMs
    }
    socket.emit("send_response", data)
    // setBlueIsPressed(false)
  };

  const [questionType, setQuestionType] = React.useState("Four Options");
  const [leaderboardData, setLeaderboardData] = React.useState([]);
  const [questionCounter, setQuestionCounter] = React.useState(0);
  const [numOfQuestions, setNumOfQuestions] = React.useState("");

  var totalScoreVariable = 0
  const [totalScore, setTotalScore] = React.useState(0);
  const [currentQuestionScore, setCurrentQuestionScore] = React.useState(0);


  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [yellowIsPressed, setYellowIsPressed] = React.useState(false);
  const [greenIsPressed, setGreenIsPressed] = React.useState(false);
  const [redIsPressed, setRedIsPressed] = React.useState(false);
  const [blueIsPressed, setBlueIsPressed] = React.useState(false);

  const [openWaitingPage, setOpenWaitingPage] = React.useState(true);
  const [openCorrectAnswer, setOpenCorrectAnswer] = React.useState(false);
  const [openWrongAnswer, setOpenWrongAnswer] = React.useState(false);
  const [openFinishLeaderboard, setOpenFinishLeaderboard] = React.useState(false);

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
          {openWaitingPage == false && openCorrectAnswer == false && openWrongAnswer == false && openFinishLeaderboard == false &&
            <Text>{questionCounter} of {numOfQuestions}</Text>
          }
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
            handleYellowClick={handleYellowClick}
            handleGreenClick={handleGreenClick}
            handleRedClick={handleRedClick}
            handleBlueClick={handleBlueClick}
            questionType={questionType}
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
          currentQuestionScore={currentQuestionScore}
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
          currentQuestionScore={currentQuestionScore}
        />
      )}
      {openFinishLeaderboard == true && (
        <TriviaFinishLeaderboard
          openWaitingPage={openWaitingPage}
          setOpenWaitingPage={setOpenWaitingPage}
          openFinishLeaderboard={openFinishLeaderboard}
          setOpenFinishLeaderboard={setOpenFinishLeaderboard}
          navigation={navigation}
          leaderboardData={leaderboardData}
        />
      )}
      <View style={styles.footer}>
        <Box style={{ position: "absolute", left: 0, paddingLeft: 10 }}>
          <Heading size="sm">{username}</Heading>
        </Box>
        <Box style={{ position: "absolute", right: 0, paddingRight: 10 }}>
          <Box style={{ padding: 8, backgroundColor: "#353535" }}>
            <Heading size="md" style={{ color: "white" }}>
              {totalScore}
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
