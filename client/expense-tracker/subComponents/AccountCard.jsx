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
         <Text style={[styles.textWhite, styles.smallText]}>{accountName}</Text>
         <Text style={[styles.textWhite, styles.font]}>
            {currency} {accountBalance}
         </Text>
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
