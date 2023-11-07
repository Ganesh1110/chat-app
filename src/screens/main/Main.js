import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UsersScreen from "../tabs/UsersScreen";
import SettingsScreen from "../tabs/SettingsScreen";

const Main = () => {
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.container}>
      {selected == 0 ? <UsersScreen /> : <SettingsScreen />}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelected(0);
          }}
        >
          <Text
            style={[styles.tabText, { color: selected == 0 ? "red" : "white" }]}
          >
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelected(1);
          }}
        >
          <Text
            style={[styles.tabText, { color: selected == 1 ? "red" : "white" }]}
          >
            settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "green",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  tab: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  tabText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
