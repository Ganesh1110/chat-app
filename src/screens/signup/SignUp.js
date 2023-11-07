import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getInitialState = () => {
    setUserName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
  };

  const submitFunction = () => {
    const userId = uuid.v4();
    firestore()
      .collection("users")
      .doc(userId)
      .set({
        userId: userId,
        userName: userName,
        email: email,
        mobile: mobile,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        console.log("done");
        getInitialState();
        navigation.navigate("Login");
      })
      .catch((error) => console.error(error));
  };
  const validate = () => {
    let isValid = true;
    if (userName == "") {
      isValid = false;
    }
    if (email == "") {
      isValid = false;
    }
    if (mobile == "") {
      isValid = false;
    }
    if (password == "") {
      isValid = false;
    }
    if (confirmPassword == "") {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        placeholder="Enter User Name..."
        style={[styles.input, { marginTop: 20 }]}
        value={userName}
        onChangeText={(value) => setUserName(value)}
      />
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, { marginTop: 20 }]}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder="Enter Mobile Number"
        keyboardType="decimal-pad"
        style={[styles.input, { marginTop: 20 }]}
        value={mobile}
        onChangeText={(value) => setMobile(value)}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, { marginTop: 20 }]}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={[styles.input, { marginTop: 20 }]}
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            submitFunction();
          } else {
            alert("Please enter correct data");
          }
        }}
      >
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        or Login
      </Text>
    </View>
  );
};

export default SignUp;

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
