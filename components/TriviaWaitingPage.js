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
    backgroundColor: "dodgerblue",
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

const TriviaWaitingPage = (props) => {
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner
            size="lg"
            color="warning.500"
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          />
        </HStack>
        <Heading style={{ paddingTop: 60 }} size="md">
          Waiting...
        </Heading>
        {/* <Button size="md" onPress={() => props.setOpenWaitingPage(false)}>
          Testing: Start Trivia
        </Button>
        <Button
          size="md"
          onPress={() => {
            props.setOpenCorrectAnswer(true), props.setOpenWaitingPage(false);
          }}
        >
          Testing: Simulate Correct Answer
        </Button>
        <Button
          size="md"
          onPress={() => {
            props.setOpenWrongAnswer(true), props.setOpenWaitingPage(false);
          }}
        >
          Testing: Simulate Wrong Answer
        </Button> */}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default TriviaWaitingPage;
