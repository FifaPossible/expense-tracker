import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import NewAccountScreen from "../screens/NewAccount";
import RecordsScreen from "../screens/Records";
import ProfilePicture from "../screens/ProfilePicture";

import DrawerNavigation from "./DrawerNavigation";
import IncomeExpense from "../screens/IncomeExpense";

const Stack = createStackNavigator();

export default function HomeStackNavigation() {
   return (
      <Stack.Navigator
         initialRouteName="Login"
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="SignUp" component={SignupScreen} />
         <Stack.Screen name="Home page" component={DrawerNavigation} />
         <Stack.Screen name="NewAccount" component={NewAccountScreen} />
         <Stack.Screen name="New record" component={IncomeExpense} />
         <Stack.Screen name="Profile picture" component={ProfilePicture} />
      </Stack.Navigator>
   );
}
