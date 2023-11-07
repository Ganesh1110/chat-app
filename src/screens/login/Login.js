import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    firestore()
      .collection("users")
      .where("email", "==", email)
      .get()
      .then((user) => {
        if (user.docs.length > 0) {
          if (user.docs[0].data().password === password) {
            navigationFunction(
              user.docs[0].data.name,
              user.docs[0].data().email,
              user.docs[0].data().userId
            );
          } else {
            alert("Invalid Password");
          }
        } else {
          alert("Invalid Email");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigationFunction = async (name, email, userId) => {
    try {
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("userId", userId);
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, { marginTop: 20 }]}
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, { marginTop: 20 }]}
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          loginUser();
        }}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        or Sign Up
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 50,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: "center",
    paddingLeft: 20,
  },
  btn: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "green",
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
  orLogin: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 20,
    color: "black",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
