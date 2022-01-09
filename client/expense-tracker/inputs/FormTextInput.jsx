import React from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";

import { sizes } from "../utils/variables";

const screenWidth = Dimensions.get("screen").width;

export default function FormTextInput({
   placeholder,
   onChangeText,
   secureTextEntry,
   value,
}) {
   return (
      <View>
         <TextInput
            placeholder={placeholder}
            style={styles.textInput}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            value={value}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   textInput: {
      height: sizes.inputHeight,
      borderRadius: 10,
      width: screenWidth - 20,
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      marginVertical: 10,
   },
});
