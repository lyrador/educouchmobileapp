import React from "react";
import { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Animated,
  Easing,
} from "react-native";
import {
  NativeBaseProvider,
  Button,
  Spinner,
  HStack,
  Heading,
} from "native-base";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5686AC",
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

const TriviaFinishLeaderboard = (props) => {
  const state = {
    firstPlaceAnimation: new Animated.Value(0),
    secondPlaceAnimation: new Animated.Value(0),
    thirdPlaceAnimation: new Animated.Value(0),
  };

  const firstPlaceAnimationStyles = {
    opacity: state.firstPlaceAnimation,
    zIndex: 8,
    top: "20%",
    position: "absolute",
  };

  const secondPlaceAnimationStyles = {
    opacity: state.secondPlaceAnimation,
    zIndex: 8,
    top: "35%",
    position: "absolute",
    left: "26%",
  };

  const thirdPlaceAnimationStyles = {
    opacity: state.thirdPlaceAnimation,
    zIndex: 8,
    top: "38%",
    position: "absolute",
    right: "26%",
  };

  useEffect(() => {
    Animated.timing(state.firstPlaceAnimation, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(state.firstPlaceAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });
    Animated.timing(state.secondPlaceAnimation, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(state.secondPlaceAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });
    Animated.timing(state.thirdPlaceAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(state.thirdPlaceAnimation, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[firstPlaceAnimationStyles]}>
          <Heading
            color="white"
            size="xl"
            style={{
              zIndex: 10,
            }}
          >
            waryl
          </Heading>
        </Animated.View>
        <Animated.View style={[secondPlaceAnimationStyles]}>
          <Heading
            color="white"
            size="lg"
            style={{
              zIndex: 10,
            }}
          >
            waryl
          </Heading>
        </Animated.View>
        <Animated.View style={[thirdPlaceAnimationStyles]}>
          <Heading
            color="white"
            size="lg"
            style={{
              zIndex: 10,
            }}
          >
            waryl
          </Heading>
        </Animated.View>
        <Image
          source={require("../assets/leaderboardnew2.gif")}
          style={{
            top: "-10%",
            height: "70%",
            resizeMode: "contain",
          }}
        />
        <View
          style={{
            top: "-10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heading color="white" size="2xl">
            -- 1st Place --
          </Heading>
          <Heading color="white" size="lg">
            Fabulous!
          </Heading>
        </View>
        <Button size="md" onPress={() => props.navigation.pop()}>
          Testing: Proceed to End
        </Button>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default TriviaFinishLeaderboard;
