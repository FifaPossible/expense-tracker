//import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigation from "./navigation/StackNavigation";
// import DrawerNavigation from "./navigation/DrawerNavigation";
import store from "./store";
import IncomeExpense from "./screens/IncomeExpense";

export default function App() {
   return (
      <Provider store={store}>
         <NavigationContainer>
            <StackNavigation />
         </NavigationContainer>
      </Provider>
      // <Provider store={store}>
      //    <View>
      //       <IncomeExpense />
      //    </View>
      // </Provider>
   );
}
