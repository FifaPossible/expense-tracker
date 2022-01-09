import React from "react";
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
} from "react-native";

import { colors, sizes } from "../utils/variables";

const screenWidth = Dimensions.get("screen").width;
export default function ActionButton({ text, onPress }) {
   return (
      <View>
         <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.secondary,
      height: sizes.inputHeight,
      width: screenWidth - 20,
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
   },
   text: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
   },
});
