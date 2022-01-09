import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import Lodash from "lodash";

import { sizes } from "../utils/variables";

export default function BalanceCard() {
   const [maxBalance, setMaxBalance] = useState(null);
   const [maxAccount, setMaxAccount] = useState(null);

   const user = useSelector((state) => state.user.user);
   const accounts = useSelector((state) => state.accounts.accounts);

   useEffect(() => {
      const balanceArray = accounts.map((account) => {
         return account.balance;
      });

      const largest = Lodash.max(balanceArray);
      setMaxBalance(largest);
      if (maxBalance !== null) {
         const largestAccount = accounts.filter(
            (account) =>
               user._id === account.user && account.balance === largest
         );
         setMaxAccount(largestAccount);
      }
   }, [maxBalance]);

   const eachMaxAccount =
      maxAccount !== null &&
      maxAccount.map((maxAccount) => {
         return (
            <View>
               <Text
                  style={[
                     styles.textBold,
                     styles.textMedium,
                     { color: "rgba(0,0,250,1)" },
                  ]}
               >
                  {maxAccount !== null && maxAccount.name}
               </Text>
               <Text
                  style={[
                     styles.textBold,
                     styles.textMedium,
                     { color: "rgba(0,250,0,1)" },
                  ]}
               >
                  {maxAccount !== null && `NGN ${maxAccount.balance}`}
               </Text>
            </View>
         );
      });

   return (
      <View style={styles.container}>
         <View style={styles.miniContainer1}>
            <Text style={[styles.textBold]}>Maximum Balance</Text>
         </View>

         <View style={styles.miniContainer2}>
            <View style={styles.border}>
               <Text style={styles.textSmall}>
                  In which account do I have most of my money?
               </Text>
            </View>
            {eachMaxAccount}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   border: {
      borderBottomWidth: sizes.borderWidth,
      borderBottomColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
   },
   container: {
      margin: 10,
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      borderRadius: 5,
      backgroundColor: "#fff",
      shadowColor: sizes.shadowColor,
      shadowOffset: sizes.shadowOffset,
      shadowRadius: sizes.shadowRadius,
   },
   miniContainer1: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
   },
   miniContainer2: {
      flexDirection: "column",
      marginVertical: 10,
      marginHorizontal: 5,
   },
   textBold: {
      fontWeight: "bold",
   },
   textSmall: {
      fontSize: 11.2,
      paddingBottom: 10,
   },
   textMedium: {
      fontSize: 22.4,
   },
});
