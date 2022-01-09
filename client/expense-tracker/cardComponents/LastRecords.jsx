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

import { sizes, colors } from "../utils/variables";
import ShowMore from "../buttons/ShowMore";
import HistorySlot from "../subComponents/HistorySlot";

export default function LastRecords({ navigation }) {
   const [currentAccount, setCurrentAccount] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
   const [dataLoaded, setDataLoaded] = useState(false);

   const user = useSelector((state) => state.user.user);
   const accounts = useSelector((state) => state.accounts.accounts);
   const history = useSelector((state) => state.history.history);

   const dispatch = useDispatch();

   const historyData = history.map((history) => {
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
      const currentDate = new Date(),
         formattedDate = Moment(currentDate).format("DD-MM-YYYY"),
         date = history.createdAt,
         dateCreated = Moment(date).format("DD-MM-YYYY");
      if (currentAccount === null) {
         if (user._id === history.user) {
            if (dateCreated === formattedDate) {
               return (
                  <HistorySlot
                     icon={icon}
                     color={history.color}
                     type={history.type}
                     typeColor={typeColor}
                     amount={history.amount}
                     category={history.category}
                  />
               );
            }
         }
      } else {
         if (
            user._id === history.user &&
            history.type === "Expense" &&
            currentAccount[1] === history.accountId
         ) {
            if (dateCreated === formattedDate) {
               return (
                  <HistorySlot
                     icon={icon}
                     color={history.color}
                     type={history.type}
                     typeColor={typeColor}
                     amount={history.amount}
                     category={history.category}
                  />
               );
            }
         }
      }
   });

   const onPressShowMore = () => {
      navigation.navigate("Records");
   };

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

   return (
      <View style={styles.container}>
         <View style={styles.miniContainer1}>
            <Text style={[styles.textBold]}>Last records overview</Text>
            <TouchableOpacity onPress={handleModal}>
               <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={{ color: colors.more }}
               />
            </TouchableOpacity>
         </View>
         {currentAccount !== null && (
            <Text style={styles.currentAccount}>{currentAccount[0]}</Text>
         )}
         {currentAccount === null && (
            <Text style={styles.currentAccount}>All Accounts</Text>
         )}
         <Text style={[styles.textSmall, { marginLeft: 5 }]}>TODAY</Text>

         {historyData}
         <ShowMore onPress={onPressShowMore} />

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

   miniContainer1: {
      flexDirection: "row",
      justifyContent: "space-between",
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
