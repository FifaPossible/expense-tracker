import React, { useState } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   ScrollView,
   ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { colors, sizes, serverUrl } from "../utils/variables";
import DropDown from "../inputs/DropDown";
import { pushedToAccounts } from "../reducers/accountSlice";

export default function NewAccount({ navigation }) {
   const [name, setName] = useState("");
   const [balance, setBalance] = useState(null);
   const [successMessage, setSuccessMessage] = useState("");
   const [success, setSuccess] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [error, setError] = useState(false);
   const [validationErrors, setValidationErrors] = useState("");

   const [openColor, setOpenColor] = useState(false);
   const [colorValue, setColorValue] = useState(null);
   const [color, setColor] = useState([
      { label: "green", value: "green" },
      { label: "blue", value: "blue" },
      { label: "yellow", value: "yellow" },
      { label: "red", value: "red" },
      { label: "purple", value: "purple" },
      { label: "indigo", value: "indigo" },
      { label: "orange", value: "orange" },
      { label: "grey", value: "grey" },
      { label: "brown", value: "brown" },
   ]);

   const dispatch = useDispatch();

   const updateName = (accountName) => {
      setName(accountName);
   };
   const updateBalance = (accountBalance) => {
      setBalance(accountBalance);
   };

   const user = useSelector((state) => state.user.user);

   const save = async () => {
      if (name === "") {
         setError(true);
         setValidationErrors("Account name field is required");
      } else if (balance === null) {
         setError(true);
         setValidationErrors("Balance filed is required");
      } else if (colorValue === null) {
         setError(true);
         setValidationErrors("select a color");
      } else {
         const credentials = {
            user: user._id,
            name,
            balance,
            currency: "NGN",
            color: colorValue,
         };

         setError(false);
         setIsLoading(true);

         try {
            const res = await Axios.post(
               serverUrl + "/addAccount",
               credentials
            );
            if (res.data.status === "success") {
               setIsLoading(false);
               setSuccess(true);
               setError(false);
               setSuccessMessage("Account created successfully");
               dispatch(pushedToAccounts(res.data.account));
               setTimeout(() => {
                  navigation.navigate("Home");
               }, 2000);
            }
         } catch (err) {
            setIsLoading(false);
            setError(true);
            setValidationErrors(
               "Oops! Could not connect to server, check your internet connection"
            );
         }
      }
   };

   return (
      <ScrollView>
         <View style={styles.container}>
            <View style={styles.miniContainer1}>
               <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <FontAwesomeIcon icon={faTimes} style={styles.icon} />
               </TouchableOpacity>
               <Text style={styles.heading}>Create New Account</Text>
               <TouchableOpacity onPress={save}>
                  <FontAwesomeIcon icon={faCheck} style={styles.icon} />
               </TouchableOpacity>
            </View>

            <View style={styles.miniContainer2}>
               <View>
                  {isLoading && (
                     <ActivityIndicator size="small" color={colors.secondary} />
                  )}
                  {error && (
                     <Text style={styles.error}>{validationErrors}</Text>
                  )}
                  {success && (
                     <Text style={styles.success}>{successMessage}</Text>
                  )}
               </View>
               <Text style={styles.text}>Account name</Text>
               <TextInput
                  style={styles.textInput}
                  onChangeText={updateName}
                  value={name}
               />
               <Text style={styles.text}>Account Balance</Text>
               <TextInput
                  style={styles.textInput}
                  onChangeText={updateBalance}
                  keyboardType="numeric"
                  value={balance}
               />
               <Text style={styles.text}>Color</Text>
               <DropDown
                  open={openColor}
                  value={colorValue}
                  items={color}
                  setOpen={setOpenColor}
                  setValue={setColorValue}
                  setItems={setColor}
                  placeholder="choose color"
               />
            </View>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {},
   miniContainer1: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: colors.secondary,
      paddingVertical: 8,
      marginBottom: 10,
   },
   error: {
      color: "red",
      fontWeight: "bold",
   },
   heading: {
      fontSize: sizes.headers,
      color: colors.textPrimary,
   },
   icon: {
      color: colors.textPrimary,
   },
   miniContainer2: {
      justifyContent: "center",
      marginHorizontal: 10,
   },
   success: {
      color: "green",
      fontWeight: "bold",
   },
   text: {
      fontSize: 11.2,
      color: "rgba(0,0,0,0.4)",
      marginTop: 10,
   },
   textInput: {
      height: 32,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.2)",
      marginBottom: 5,
   },
});
