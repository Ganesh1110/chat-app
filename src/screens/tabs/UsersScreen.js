import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
let id = "";
const UsersScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    id = await AsyncStorage.getItem("userId");
    let temp = [];
    const email = await AsyncStorage.getItem("email");
    await firestore()
      .collection("users")
      .where("email", "!=", email)
      .get()
      .then((users) => {
        if (users.docs != []) {
          users.forEach((user) => {
            temp.push(user.data());
          });
          setUsers(temp);
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Application</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => {
                navigation.navigate("Chat", { data: item, id: id });
              }}
            >
              <Text style={styles.userIcon}>User</Text>
              <Text style={styles.userName}>{item.userName}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
  userItem: {
    width: Dimensions.get("window").width - 50,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: "center",
  },
  userIcon: {
    width: 40,
    height: 40,
    backgroundColor: "green",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  userName: {
    fontSize: 20,
    marginLeft: 15,
    color: "black",
  },
});
