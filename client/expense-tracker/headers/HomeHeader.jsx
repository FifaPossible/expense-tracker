import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import { colors, serverUrl, sizes } from "../utils/variables";

export default function HomeHeader({ navigation }) {
   const user = useSelector((state) => state.user.user);
   console.log(user, user.profilePicture);

   const openDrawer = () => {
      navigation.openDrawer();
   };

   const viewProfilePicture = () => {
      navigation.navigate("Profile picture", {
         imgUri: `${serverUrl}/profile_pictures/${user.profilePicture}`,
      });
   };

   return (
      <View style={styles.container}>
         <View style={styles.miniContainer1}>
            <View style={styles.miniContainer2}>
               <TouchableOpacity
                  style={{ marginRight: 32 }}
                  onPress={openDrawer}
               >
                  <FontAwesomeIcon
                     icon={faBars}
                     style={[styles.whiteText, styles.boldText]}
                     size={sizes.headers}
                  />
               </TouchableOpacity>
               <Text style={[styles.whiteText, styles.boldText, styles.header]}>
                  Home
               </Text>
            </View>
            <TouchableOpacity onPress={viewProfilePicture}>
               {user.profilePicture === undefined && (
                  <FontAwesomeIcon
                     icon={faUserCircle}
                     style={[styles.whiteText, styles.boldText, styles.header]}
                     size={30}
                  />
               )}
               {user.profilePicture !== undefined && (
                  <Image
                     source={{
                        uri: `${serverUrl}/profile_pictures/${user.profilePicture}`,
                     }}
                     style={styles.homeImage}
                  />
               )}
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.secondary,
      textAlign: "center",
   },
   miniContainer1: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 13,
   },
   miniContainer2: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      margin: 5,
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
   homeImage: {
      height: 30,
      width: 30,
      borderRadius: 15,
   },
});
