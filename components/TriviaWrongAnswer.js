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
    backgroundColor: "red",
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

const TriviaWrongAnswer = (props) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/noporcupine.gif")}
          style={{
            height: 220,
            resizeMode: "contain",
          }}
        />
        <HStack space={2} justifyContent="center" style={{ paddingTop: "10%" }}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading fontSize="md">Waiting for sensei...</Heading>
          {/* <Heading size="md">Waiting for sensei...</Heading> */}
        </HStack>
        <Button
          size="md"
          style={{}}
          onPress={() => {
            props.setOpenWaitingPage(false), props.setOpenWrongAnswer(false);
          }}
        >
          Testing: Proceed to Next Question
        </Button>
        <Button
          size="md"
          onPress={() => {
            props.setOpenFinishLeaderboard(true),
              props.setOpenWrongAnswer(false);
          }}
        >
          Testing: Simulate Finish
        </Button>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default TriviaWrongAnswer;
