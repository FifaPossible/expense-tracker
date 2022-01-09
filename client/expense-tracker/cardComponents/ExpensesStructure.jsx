import React, { useState, useEffect } from "react";
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   Modal,
   Pressable,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import { colors, sizes, serverUrl } from "../utils/variables";
import ShowMore from "../buttons/ShowMore";
import PieChart from "../subComponents/PieChart";

export default function ExpensesStructure({ navigation }) {
   const [modalVisible, setModalVisible] = useState(false);
   const [currentAccount, setCurrentAccount] = useState(null);
   const [dataLoaded, setDataLoaded] = useState(false);
   const [totalExpense, setTotalExpense] = useState(null);
   const [filteredTotalExpense, setFilteredTotalExpense] = useState(null);

   const accounts = useSelector((state) => state.accounts.accounts);

   const onPressShowMore = () => {
      navigation.navigate("Statistics");
   };

   const user = useSelector((state) => state.user.user);
   const dispatch = useDispatch();
   const incomeExpense = useSelector(
      (state) => state.incomeExpense.incomeExpense
   );

   const pieData =
      currentAccount === null
         ? () => {
              const userIncomeExpense = incomeExpense.filter(
                 (incomeExpense) => user._id === incomeExpense._id.user
              );
              return userIncomeExpense.map((incomeExpense) => {
                 return {
                    name:
                       incomeExpense._id.category +
                       "(" +
                       incomeExpense._id.accountName +
                       ")",
                    total: incomeExpense.total,
                    color: incomeExpense._id.color,
                    legendFontColor: incomeExpense._id.color,
                    legendFontSize: 12,
                 };
              });
           }
         : () => {
              const accData = incomeExpense.filter(
                 (incomeExpense) =>
                    user._id === incomeExpense._id.user &&
                    incomeExpense._id.type === "Expense" &&
                    currentAccount[1] === incomeExpense._id.accountId
              );

              return accData.map((accData) => {
                 return {
                    name: accData._id.category,
                    total: accData.total,
                    color: accData._id.color,
                    legendFontColor: accData._id.color,
                    legendFontSize: 12,
                 };
              });
           };

   useEffect(() => {
      const userIncomeExpense = incomeExpense.filter(
         (incomeExpense) => user._id === incomeExpense._id.user
      );
      const totalArray = userIncomeExpense.map((arr) => {
         return {
            total: arr.total,
         };
      });
      let total = 0;
      for (let i = 0; i < totalArray.length; i++) {
         total += totalArray[i].total;
      }

      setTotalExpense(total);

      if (dataLoaded) {
         const totalFilter = incomeExpense.filter(
            (incomeExpense) =>
               user._id === incomeExpense._id.user &&
               incomeExpense._id.type === "Expense" &&
               currentAccount[1] === incomeExpense._id.accountId
         );

         const totalFilteredArray = totalFilter.map((arr) => {
            return {
               total: arr.total,
            };
         });
         let filteredTotal = 0;
         for (let i = 0; i < totalFilteredArray.length; i++) {
            filteredTotal += totalFilteredArray[i].total;
         }

         setFilteredTotalExpense(filteredTotal);
      }
   });

   const handleModal = () => {
      modalVisible ? setModalVisible(false) : setModalVisible(true);
   };

   const accountList = accounts.map((account) => {
      return (
         <Text
            onPress={() => {
               setDataLoaded(true);
               setCurrentAccount([
                  account.name,
                  account._id,
                  account.balance,
                  account.currency,
               ]);
               setModalVisible(false);
            }}
            style={styles.accountList}
            key={account._id}
         >
            {account.name}
         </Text>
      );
   });

   return (
      <View style={styles.container}>
         <View style={styles.miniContainer1}>
            <Text style={[styles.textBold]}>Expenses Structure</Text>
            <TouchableOpacity onPress={handleModal}>
               <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={{ color: colors.more }}
               />
            </TouchableOpacity>
         </View>

         <View style={styles.miniContainer2}>
            {currentAccount !== null && (
               <Text style={styles.textSmall}>{currentAccount[0]}</Text>
            )}
            {currentAccount === null && (
               <Text style={styles.textSmall}>All Accounts</Text>
            )}

            {currentAccount !== null && (
               <Text style={[styles.textBold, styles.textMedium]}>
                  {currentAccount[3]}
                  {(" ", filteredTotalExpense)}
               </Text>
            )}

            {currentAccount === null && (
               <Text style={[styles.textBold, styles.textMedium]}>
                  NGN
                  {(" ", totalExpense)}
               </Text>
            )}
         </View>
         <PieChart pieData={pieData()} />

         {/* <ShowMore onPress={onPressShowMore} /> */}
         <View style={styles.centeredView}>
            <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
            >
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <Text style={[styles.textMedium, styles.textBold]}>
                        Choose Account
                     </Text>
                     {accountList}
                     <Text
                        onPress={() => {
                           setCurrentAccount(null);
                           setDataLoaded(false);
                           setModalVisible(false);
                        }}
                        style={styles.all}
                     >
                        All Accounts
                     </Text>

                     <View style={styles.buttonView}>
                        <Pressable
                           style={styles.closeButton}
                           onPress={handleModal}
                        >
                           <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                     </View>
                  </View>
               </View>
            </Modal>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
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
   accountContainer: {},
   accountList: {
      fontWeight: "bold",
      color: "rgba(0,0,225,0.5)",
      marginBottom: 7,
      padding: 5,
   },
   all: {
      fontWeight: "bold",
      color: "rgba(0,0,225,1)",
      marginBottom: 7,
      padding: 5,
   },

   buttonText: {
      color: "white",
      fontWeight: "bold",
   },
   buttonView: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   closeButton: {
      backgroundColor: "rgba(225,0 ,0,0.8)",
      padding: 10,
      borderRadius: 10,
      textAlign: "center",
   },
   doneButton: {
      backgroundColor: "rgba(0,225 ,0,0.8)",
      padding: 10,
      borderRadius: 10,
      textAlign: "center",
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
      fontWeight: "bold",
   },
   textMedium: {
      fontSize: 22.4,
   },
});
