import React from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { NativeBaseProvider, Button } from "native-base";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "90%",
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
  containerTwo: {
    backgroundColor: "#fff",
    width: "100%",
    height: "90%",
    padding: 5,
    flexDirection: "row",
  },
  boxTwo: {
    width: "50%",
    height: "100%",
    padding: 5,
  },
});

const TriviaCards = (props) => {
  // const handleYellowClick = () => {
  //   props.setYellowIsPressed(true);
  //   props.setOpenWaitingPage(true);
  // };

  // const handleGreenClick = () => {
  //   props.setGreenIsPressed(true);
  //   props.setOpenWaitingPage(true);
  // };

  // const handleRedClick = () => {
  //   props.setRedIsPressed(true);
  //   props.setOpenWaitingPage(true);
  // };

  return (
    <NativeBaseProvider>
      {props.questionType == "Four Options" && <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Button
              size="full"
              style={{
                backgroundColor: "#EFCC00",
              }}
              onPress={props.handleYellowClick}
            >
              <Image
                source={require("../assets/starwhite.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Button
              size="full"
              style={{
                backgroundColor: "#3CB043",
              }}
              onPress={props.handleGreenClick}
            >
              <Image
                source={require("../assets/moonwhite.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Button
              size="full"
              style={{
                backgroundColor: "#D21404",
              }}
              onPress={props.handleRedClick}
            >
              <Image
                source={require("../assets/applewhite.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Button size="full" onPress={props.handleBlueClick}>
              <Image
                source={require("../assets/cloudwhite.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
      </SafeAreaView>
      }
      {props.questionType == "True or False" && <SafeAreaView style={styles.containerTwo}>
        <View style={styles.boxTwo}>
          <View style={styles.inner}>
            <Button
              size="full"
              style={{
                backgroundColor: "#3CB043",
              }}
              onPress={props.handleYellowClick}
            >
              <Image
                source={require("../assets/correct.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
        <View style={styles.boxTwo}>
          <View style={styles.inner}>
            <Button
              size="full"
              style={{
                backgroundColor: "#D21404",
              }}
              onPress={props.handleGreenClick}
            >
              <Image
                source={require("../assets/wrong.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
      </SafeAreaView>
      }
    </NativeBaseProvider>
  );
};

export default TriviaCards;
