import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/Home";
import RecordsScreen from "../screens/Records";
import UserProfileScreen from "../screens/UserProfile";

export default function DrawerNavigation() {
   const Drawer = createDrawerNavigator();
   return (
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
         <Drawer.Screen name="Home" component={HomeScreen} />
         <Drawer.Screen name="Records" component={RecordsScreen} />
         <Drawer.Screen name="User profile" component={UserProfileScreen} />
      </Drawer.Navigator>
   );
}
