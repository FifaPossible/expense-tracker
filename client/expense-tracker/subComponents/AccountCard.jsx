import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { colors } from "../utils/variables";

const AccountCard = ({
   accountName,
   currency,
   accountBalance,
   styling,
   backgroundColor,
}) => {
   return (
      <View style={[styling, { backgroundColor }]}>
         <TouchableOpacity>
            <Text style={[styles.textWhite, styles.smallText]}>
               {accountName}
            </Text>
            <Text style={[styles.textWhite, styles.font]}>
               {currency} {accountBalance}
            </Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   textWhite: {
      color: colors.textPrimary,
   },
   font: {
      fontSize: 13.92,
   },
   smallText: {
      fontSize: 11.2,
   },
});

export default AccountCard;
