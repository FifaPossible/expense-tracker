import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   StatusBar,
   TextInput,
   ScrollView,
   ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

import { colors, serverUrl } from "../utils/variables";
import DropDown from "../inputs/DropDown";
import { accountsUpdated } from "../reducers/accountSlice";
import { incomeExpenseUpdated } from "../reducers/incomeExpenseSlice";
import { historyUpdated } from "../reducers/historySlice";

export default function ExportImport({ navigation }) {
   const [amount, setAmount] = useState(null);
   const [message, setMessage] = useState("");
   const [updated, setUpdated] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const dispatch = useDispatch();

   const [error, setError] = useState(false);
   const [validationErrors, setValidationErrors] = useState("");

   const [openType, setOpenType] = useState(false);
   const [typeValue, setTypeValue] = useState(null);
   const [type, setType] = useState([
      { label: "Income", value: "Income" },
      { label: "Expense", value: "Expense" },
   ]);

   const selectAccounts = useSelector((state) => state.accounts.accounts);

   const [openAccount, setOpenAccount] = useState(false);
   const [accountValue, setAccountValue] = useState(null);
   const accounts = selectAccounts.map((account) => {
      return {
         label: account.name,
         value: { accountName: account.name, id: account._id },
      };
   });
   const [account, setAccount] = useState(accounts);

   const [openCategory, setOpenCategory] = useState(false);
   const [categoryValue, setCategoryValue] = useState(null);
   const [category, setCategory] = useState([
      { label: "Food and drinks", value: "Food and drinks" },
      { label: "Shopping", value: "Shopping" },
      { label: "Communication", value: "Communication" },
      { label: "Investment", value: "Investment" },
      { label: "Others", value: "Others" },
   ]);

   const user = useSelector((state) => state.user.user);

   const done = async () => {
      let color = "";
      if (categoryValue === "Food and drinks") {
         color = "yellow";
      } else if (categoryValue === "Shopping") {
         color = "pink";
      } else if (categoryValue === "Communication") {
         color = "green";
      } else if (categoryValue === "Investment") {
         color = "orange";
      } else color = "grey";

      if (amount === null) {
         setError(true);
         setValidationErrors("Amount is needed");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else if (typeValue === null) {
         setError(true);
         setValidationErrors("type field is required");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else if (accountValue === null) {
         setError(true);
         setValidationErrors("account field is required");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else if (categoryValue === null) {
         setError(true);
         setValidationErrors("category field is required");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else {
         setError(false);
         setIsLoading(true);
         const credentials = {
            amount,
            type: typeValue,
            category: categoryValue,
            accountName: accountValue.accountName,
            accountId: accountValue.id,
            user,
            color,
         };

         try {
            const res = await Axios.post(
               serverUrl + "/addIncomeExpense",
               credentials,
               { timeout: 8000 }
            );
            if (res.data.status === "success") {
               setUpdated(true);

               const update = await Axios.post(
                  serverUrl + "/updateBalance",
                  credentials,
                  { timeout: 8000 }
               );
            }
         } catch (e) {
            console.log(e);
            setIsLoading(false);
            setError(true);
            setValidationErrors(
               "Oops! Could not connect to server, check your internet connection"
            );
            setTimeout(() => {
               setError(false);
            }, 6000);
         }
      }
   };

   useEffect(async () => {
      if (updated) {
         try {
            const fetchedAccounts = await Axios.post(
               serverUrl + "/findAllAccount",
               { user },
               { timeout: 8000 }
            );

            const incomeExpense = await Axios.get(
               serverUrl + "/accountsArithmetics",
               { timeout: 8000 }
            );

            const history = await Axios.get(serverUrl + "/historyArithmetics", {
               timeout: 8000,
            });

            dispatch(accountsUpdated(fetchedAccounts.data.accounts));
            dispatch(incomeExpenseUpdated(incomeExpense.data));
            dispatch(historyUpdated(history.data));
            setIsLoading(false);
            setMessage("Record updated successfully");
            setTimeout(() => {
               navigation.navigate("Home");
            }, 1000);
         } catch (err) {
            console.log("an error ocured");
            setError(true);
            setValidationErrors(
               "Oops! Could not connect to server, check your internet connection"
            );
            setTimeout(() => {
               setError(false);
            }, 6000);
         }
      }
   }, [updated]);

   return (
      <ScrollView nestedScrollEnabled={true}>
         <View style={styles.container}>
            <StatusBar />
            <View style={styles.miniContainer1}>
               <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.doneClose}
               >
                  <FontAwesomeIcon
                     icon={faTimes}
                     style={styles.icon}
                     size={20}
                  />
               </TouchableOpacity>
               <TouchableOpacity style={styles.doneClose} onPress={done}>
                  <FontAwesomeIcon
                     icon={faCheck}
                     style={styles.icon}
                     size={25}
                  />
               </TouchableOpacity>
            </View>

            <View>
               {isLoading && (
                  <ActivityIndicator size="small" color={colors.secondary} />
               )}
               {error && <Text style={styles.error}>{validationErrors}</Text>}
               {updated && <Text style={styles.updated}>{message}</Text>}
               <Text style={styles.text}>Amount</Text>
               <TextInput
                  style={styles.textInput}
                  onChangeText={(amount) => setAmount(amount)}
                  keyboardType="numeric"
               />
               <DropDown
                  open={openType}
                  value={typeValue}
                  items={type}
                  setOpen={setOpenType}
                  setValue={setTypeValue}
                  setItems={setType}
                  placeholder="choose type"
               />
               <DropDown
                  open={openAccount}
                  value={accountValue}
                  items={account}
                  setOpen={setOpenAccount}
                  setValue={setAccountValue}
                  setItems={setAccount}
                  placeholder="choose Account"
               />
               <DropDown
                  open={openCategory}
                  value={categoryValue}
                  items={category}
                  setOpen={setOpenCategory}
                  setValue={setCategoryValue}
                  setItems={setCategory}
                  placeholder="choose category"
               />
            </View>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {},
   doneClose: {
      marginHorizontal: 10,
   },
   error: {
      color: "red",
      fontWeight: "bold",
   },
   miniContainer1: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.secondary,
      paddingVertical: 8,
      marginBottom: 10,
      height: 50,
   },
   icon: {
      color: colors.textPrimary,
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
   updated: {
      color: "green",
      fontWeight: "bold",
   },
});
