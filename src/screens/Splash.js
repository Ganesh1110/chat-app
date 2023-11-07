import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      autoLogin();
    }, 2000);
  }, []);

  const autoLogin = async () => {
    const id = await AsyncStorage.getItem("userId");
    if (id !== null) {
      navigation.navigate("Main");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{"Firebase \nChat App"}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  logo: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});
