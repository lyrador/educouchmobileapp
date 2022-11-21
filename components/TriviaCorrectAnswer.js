import React from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import {
  NativeBaseProvider,
  Button,
  Spinner,
  HStack,
  Heading,
} from "native-base";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1cda12",
    width: "100%",
    height: "92%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
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
});

const TriviaCorrectAnswer = (props) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/doggo.gif")}
          style={{ height: 200, resizeMode: "contain" }}
        />
        <Heading size="lg" style={{ color: "white", paddingTop: "10%" }}>
          You got
        </Heading>
        <Heading size="3xl" style={{ color: "white" }}>
          {props.currentQuestionScore}
        </Heading>
        <HStack space={2} justifyContent="center" style={{ paddingTop: "5%" }}>
          <Spinner color="indigo.500" accessibilityLabel="Loading posts" />
          <Heading color="indigo.500" fontSize="md">
            Waiting for sensei...
          </Heading>
        </HStack>
        {/* <Button
          size="md"
          onPress={() => {
            props.setOpenWaitingPage(false), props.setOpenCorrectAnswer(false);
          }}
        >
          Testing: Proceed to Next Question
        </Button>
        <Button
          size="md"
          onPress={() => {
            props.setOpenFinishLeaderboard(true),
              props.setOpenCorrectAnswer(false);
          }}
        >
          Testing: Simulate Finish
        </Button> */}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default TriviaCorrectAnswer;
