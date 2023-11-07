import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/Splash";
import SignUp from "../screens/signup/SignUp";
import Login from "../screens/login/Login";
import ChatScreen from "../screens/main/Main";
import Main from "../screens/main/Main";

const stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
