import React from "react";
import { View, ScrollView, StatusBar } from "react-native";

import { Provider } from "react-native-paper";

import HomeHeader from "../headers/HomeHeader";
import AccountList from "../cardComponents/AccountList";
import ExpensesStructure from "../cardComponents/ExpensesStructure";
import LastRecords from "../cardComponents/LastRecords";
import BalanceTrendCard from "../cardComponents/BalanceTrendCard";
import { colors, sizes } from "../utils/variables";
import FloatButton from "../buttons/FloatButton";

export default function Home({ navigation }) {
   return (
      <Provider>
         <View>
            <ScrollView nestedScrollEnabled={true}>
               <View>
                  <StatusBar backgroundColor={colors.secondary} />
                  <HomeHeader navigation={navigation} />
                  <AccountList navigation={navigation} />
                  <View>
                     <ExpensesStructure navigation={navigation} />
                     <LastRecords navigation={navigation} />
                     <BalanceTrendCard navigation={navigation} />
                  </View>
               </View>
            </ScrollView>
            <FloatButton navigation={navigation} />
         </View>
      </Provider>
   );
}
