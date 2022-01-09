import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
   faEllipsisV,
   faSearch,
   faBars,
} from "@fortawesome/free-solid-svg-icons";

import { colors, sizes } from "../utils/variables";

export default function StatisticsHeader({ navigation }) {
   const openDrawer = () => {
      navigation.openDrawer();
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
                  Statistics
               </Text>
            </View>
            <View style={styles.subMenu}>
               <View style={{ marginHorizontal: 20 }}>
                  <TouchableOpacity>
                     <FontAwesomeIcon
                        icon={faSearch}
                        style={[
                           styles.whiteText,
                           styles.boldText,
                           styles.header,
                        ]}
                        size={sizes.headers}
                     />
                  </TouchableOpacity>
               </View>
               <View>
                  <TouchableOpacity>
                     <FontAwesomeIcon
                        icon={faEllipsisV}
                        style={[
                           styles.whiteText,
                           styles.boldText,
                           styles.header,
                        ]}
                        size={sizes.headers}
                     />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   boldText: {
      fontWeight: "bold",
   },
   container: {
      backgroundColor: colors.secondary,
      textAlign: "center",
   },
   header: {
      fontSize: sizes.headers,
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
   subMenu: {
      flexDirection: "row",
      justifyContent: "space-between",
   },
   whiteText: {
      color: colors.textPrimary,
   },
});
