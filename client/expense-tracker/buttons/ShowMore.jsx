import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import { colors, sizes } from "../utils/variables";

export default function ShowMore({ onPress }) {
   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>SHOW MORE</Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      justifyContent: "center",
      alignItems: "center",
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      margin: 10,
      height: 40,
   },
   text: {
      color: colors.fontSecondary,
      fontSize: 13.92,
      fontWeight: "bold",
   },
});
