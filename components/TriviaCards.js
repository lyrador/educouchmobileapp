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
});

const TriviaCards = (props) => {
  const handleYellowClick = () => {
    props.setYellowIsPressed(true);
    setTimeout(() => {
      props.setYellowIsPressed(false);
      props.setOpenWaitingPage(true);
    }, 1);
  };

  const handleGreenClick = () => {
    props.setGreenIsPressed(true);
    setTimeout(() => {
      props.setGreenIsPressed(false);
      props.setOpenWaitingPage(true);
    }, 1);
  };

  const handleRedClick = () => {
    props.setRedIsPressed(true);
    setTimeout(() => {
      props.setRedIsPressed(false);
      props.setOpenWaitingPage(true);
    }, 1);
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Button
              size="full"
              style={{
                backgroundColor: props.yellowIsPressed ? "#f2aa00" : "#EFCC00",
              }}
              onPress={handleYellowClick}
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
                backgroundColor: props.greenIsPressed ? "#288e2b" : "#3CB043",
              }}
              onPress={handleGreenClick}
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
                backgroundColor: props.redIsPressed ? "#b00000" : "#D21404",
              }}
              onPress={handleRedClick}
            >
              <Image
                source={require("../assets/cloudwhite.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Button size="full">
              <Image
                source={require("../assets/waterwhite.png")}
                style={{ width: 100, resizeMode: "contain" }}
              />
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default TriviaCards;
