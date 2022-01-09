import React, { useEffect, useState } from "react";
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   FlatList,
   Dimensions,
   Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { colors, sizes, serverUrl } from "../utils/variables";
import AccountCard from "../subComponents/AccountCard";
import { accountsUpdated } from "../reducers/accountSlice";

const ScreenWidth = Dimensions.get("window").width;

export default function AccountList({ navigation }) {
   const [modalVisible, setModalVisible] = useState(false);
   const [success, setSuccess] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");

   const user = useSelector((state) => state.user.user);
   const accounts = useSelector((state) => state.accounts.accounts);
   const dispatch = useDispatch();

   const handleModal = () => {
      modalVisible ? setModalVisible(false) : setModalVisible(true);
   };

   const accountList = accounts.map((account) => {
      return {
         backgroundColor: account.color,
         styling: styles.accountDetailsCard,
         accountName: account.name,
         currency: account.currency,
         accountBalance: account.balance,
         id: account._id,
      };
   });

   const returnItems = (data) => {
      return (
         <View style={styles.miniContainer2}>
            <AccountCard
               backgroundColor={data.item.backgroundColor}
               styling={data.item.styling}
               accountName={data.item.accountName}
               currency={data.item.currency}
               accountBalance={data.item.accountBalance}
            />
         </View>
      );
   };

   const chooseAccount = accounts.map((account) => {
      return (
         <TouchableOpacity
            onPress={async () => {
               const credential = { accountId: account._id };
               try {
                  const res = await axios.post(
                     serverUrl + "/deleteAccount",
                     credential
                  );
                  if (res.status === 200) {
                     const fetchedAccount = await axios.post(
                        serverUrl + "/findAllAccount",
                        { user }
                     );
                     dispatch(accountsUpdated(fetchedAccount.data.accounts));
                     setSuccess(true);
                     setSuccessMessage(res.data);
                     setTimeout(() => {
                        setSuccess(false);
                        setModalVisible(false);
                     }, 2000);
                  }
               } catch (e) {
                  console.log(e);
               }
            }}
         >
            <Text style={styles.accountList} key={account._id}>
               {account.name}
            </Text>
         </TouchableOpacity>
      );
   });

   const gotoAddAccount = () => {
      navigation.navigate("NewAccount");
   };

   return (
      <View style={styles.container}>
         <View style={styles.miniContainer1}>
            <Text style={styles.boldText}>List of accounts</Text>
            <TouchableOpacity onPress={handleModal}>
               <View style={styles.box}>
                  <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
               </View>
            </TouchableOpacity>
         </View>

         <FlatList
            data={accountList}
            renderItem={returnItems}
            keyExtractor={(item) => item.id}
            numColumns={2}
         />
         <TouchableOpacity onPress={gotoAddAccount}>
            <View style={styles.accountDetailsSetting}>
               <Text
                  style={[
                     styles.boldText,
                     {
                        color: colors.fontSecondary,
                        fontSize: 15,
                        marginRight: 10,
                     },
                  ]}
               >
                  ADD ACCOUNT
               </Text>
               <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ color: colors.fontSecondary }}
               />
            </View>
         </TouchableOpacity>

         <View style={styles.centeredView}>
            <Modal
               animationType="slide"
               transparent={true}
               visible={modalVisible}
            >
               <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                     <Text style={[styles.textLarge, styles.textBold]}>
                        Choose account to delete
                     </Text>
                     {success && (
                        <Text style={styles.success}>{successMessage}</Text>
                     )}
                     {chooseAccount}
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
      </View>
   );
}

const styles = StyleSheet.create({
   accountList: {
      fontWeight: "bold",
      color: "rgba(0,0,225,0.5)",
      marginBottom: 3,
      padding: 5,
      fontSize: 20,
   },
   container: {
      margin: 0,
      left: 0,
      right: 0,
      padding: 0,
   },
   miniContainer1: {
      flexDirection: "row",
      margin: 13,
      justifyContent: "space-between",
   },
   miniContainer2: {
      flexDirection: "row",
   },
   accountDetailsCard: {
      width: ScreenWidth / 2 - 6,
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      borderRadius: 5,
      margin: 3,
      padding: 5,
   },
   accountDetailsSetting: {
      width: ScreenWidth - 6,
      height: 40,
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      borderRadius: 5,
      margin: 5,
      padding: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
   },
   whiteText: {
      color: colors.textPrimary,
   },
   boldText: {
      fontWeight: "bold",
   },
   header: {
      fontSize: sizes.headers,
   },
   box: {
      borderWidth: sizes.borderWidth,
      borderColor: sizes.borderColor,
      borderStyle: sizes.borderStyle,
      height: 32,
      width: 32,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      color: "white",
      fontWeight: "bold",
   },
   buttonView: {
      flexDirection: "row",
      justifyContent: "center",
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
   success: {
      color: "green",
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
