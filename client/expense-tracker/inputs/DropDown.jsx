import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const screenWidth = Dimensions.get("screen").width;
const DropDown = ({
   open,
   value,
   items,
   setValue,
   setOpen,
   setItems,
   onChangeValue,
   placeholder,
   onChangeItem,
}) => {
   return (
      <DropDownPicker
         open={open}
         value={value}
         items={items}
         setOpen={setOpen}
         setValue={setValue}
         setItems={setItems}
         containerStyle={styles.container}
         textStyle={styles.text}
         onChangeValue={onChangeValue}
         placeholder={placeholder}
         onChangeItem={onChangeItem}
      />
   );
};

const styles = StyleSheet.create({
   container: {
      borderRadius: 10,
      fontSize: 16,
      height: 200,
   },
});

export default DropDown;
