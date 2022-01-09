import React, { useState, useEffect } from "react";
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   Modal,
   ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
   faEllipsisV,
   faPizzaSlice,
   faShoppingCart,
   faPhoneSquareAlt,
   faChartLine,
   faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Moment from "moment";
import Lodash from "lodash";
import { Provider } from "react-native-paper";

import RecordHeader from "../headers/RecordHeader";
import HistorySlot from "../subComponents/HistorySlot";

import FloatButton from "../buttons/FloatButton";

export default function Records({ navigation }) {
   const [currentAccount, setCurrentAccount] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
   const [dataLoaded, setDataLoaded] = useState(false);
   const [filteredTotalHistory, setFilteredTotalHistory] = useState(null);
   const [totalHistory, setTotalHistory] = useState(null);

   const user = useSelector((state) => state.user.user);
   const accounts = useSelector((state) => state.accounts.accounts);
   const history = useSelector((state) => state.history.history);

   const dispatch = useDispatch();

   const copiedHistory = [...history];
   const sortedHistory = copiedHistory.sort((a, b) => {
      const c = new Date(a.createdAt);
      const d = new Date(b.createdAt);
      return d - c;
   });

   const historyData = sortedHistory.map((history) => {
      let category = history.category;
      let icon = null;
      switch (category) {
         case "Food and drinks":
            icon = faPizzaSlice;
            break;
         case "Shopping":
            icon = faShoppingCart;
            break;
         case "Communication":
            icon = faPhoneSquareAlt;
            break;
         case "Investment":
            icon = faChartLine;
            break;
         case "Others":
            icon = faWallet;
            break;
         default:
            icon = null;
      }
      let historyType = history.type;
      let typeColor = "";
      switch (historyType) {
         case "Income":
            typeColor = "green";
            break;
         case "Expense":
            typeColor = "red";
            break;
      }

      const dateCreated = history.createdAt;
      const currentDate = new Date();
      const currentDateReadable = Moment(currentDate).format("DD-MM-YYYY");
      const createdAtReadable = Moment(dateCreated).format("DD-MM-YYYY");
      const date =
         createdAtReadable === currentDateReadable
            ? "Today"
            : createdAtReadable;

      if (currentAccount === null) {
         if (user._id === history.user) {
            return (
               <HistorySlot
                  icon={icon}
                  color={history.color}
                  type={history.type}
                  typeColor={typeColor}
                  amount={history.amount}
                  category={history.category}
                  dateCreated={date}
               />
            );
         }
      } else {
         if (
            user._id === history.user &&
            currentAccount[1] === history.accountId
         ) {
            return (
               <HistorySlot
                  icon={icon}
                  color={history.color}
                  type={history.type}
                  typeColor={typeColor}
                  amount={history.amount}
                  category={history.category}
                  dateCreated={date}
               />
            );
         }
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
            id={account._id}
         >
            {account.name}
         </Text>
      );
   });

   useEffect(() => {
      const userIncomeHistory = sortedHistory.filter(
         (sortedHistory) =>
            user._id === sortedHistory.user && sortedHistory.type === "Income"
      );
      const userExpenseHistory = sortedHistory.filter(
         (sortedHistory) =>
            user._id === sortedHistory.user && sortedHistory.type === "Expense"
      );

      const totalIncomeArray = userIncomeHistory.map((arr) => {
         return arr.amount;
      });
      const totalExpenseArray = userExpenseHistory.map((arr) => {
         return arr.amount;
      });

      const totalIncome = Lodash.sum(totalIncomeArray);
      const totalExpense = Lodash.sum(totalExpenseArray);

      const grand_total = totalIncome - totalExpense;

      const final_total =
         grand_total < 0 ? `-NGN ${-1 * grand_total}` : `NGN ${grand_total}`;
      setTotalHistory(final_total);

      if (dataLoaded) {
         const totalFilterExpense = sortedHistory.filter(
            (sortedHistory) =>
               user._id === sortedHistory.user &&
               sortedHistory.type === "Expense" &&
               currentAccount[1] === sortedHistory.accountId
         );
         const totalFilterIncome = sortedHistory.filter(
            (sortedHistory) =>
               user._id === sortedHistory.user &&
               sortedHistory.type === "Income" &&
               currentAccount[1] === sortedHistory.accountId
         );

         const totalExpenseFilteredArray = totalFilterExpense.map((arr) => {
            return arr.amount;
         });
         const totalIncomeFilteredArray = totalFilterIncome.map((arr) => {
            return arr.amount;
         });

         const filteredTotalIncome = Lodash.sum(totalIncomeFilteredArray);
         const filteredTotalExpense = Lodash.sum(totalExpenseFilteredArray);
         const grandTotal = filteredTotalIncome - filteredTotalExpense;

         const finalTotal =
            grandTotal < 0 ? `-NGN ${-1 * grandTotal}` : `NGN ${grandTotal}`;

         setFilteredTotalHistory(finalTotal);
      }
   });

   return (
      <Provider>
         <ScrollView>
            <View style={styles.container}>
               <RecordHeader
                  navigation={navigation}
                  openModal={handleModal}
                  total={
                     currentAccount === null
                        ? totalHistory
                        : filteredTotalHistory
                  }
                  currentAccount={
                     currentAccount === null
                        ? "ALL RECORDS"
                        : currentAccount[0].toUpperCase()
                  }
               />

               {historyData}

               <View style={styles.centeredView}>
                  <Modal
                     animationType="slide"
                     transparent={true}
                     visible={modalVisible}
                  >
                     <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                           <Text style={[styles.textLarge, styles.textBold]}>
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
                              <TouchableOpacity
                                 style={styles.closeButton}
                                 onPress={handleModal}
                              >
                                 <Text style={styles.buttonText}>Close</Text>
                              </TouchableOpacity>
                           </View>
                        </View>
                     </View>
                  </Modal>
               </View>
               <FloatButton navigation={navigation} />
            </View>
         </ScrollView>
      </Provider>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
   },

   miniContainer1: {
      flexDirection: "row",
      justifyContent: "space-around",
      margin: 5,
   },

   textBold: {
      fontWeight: "bold",
   },

   textLarge: {
      fontSize: 22.4,
   },

   textMedium: {
      fontSize: 12.8,
   },

   textSmall: {
      fontSize: 11.2,
   },

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
   currentAccount: {
      fontWeight: "bold",
      color: "grey",
      fontSize: 20,
      marginLeft: 5,
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
});
