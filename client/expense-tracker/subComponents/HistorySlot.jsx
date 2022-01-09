import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { sizes } from "../utils/variables";

export default class HistorySlot extends Component {
   render() {
      const { icon, amount, color, type, typeColor, category, dateCreated } =
         this.props;
      return (
         <View style={styles.miniContainer2}>
            <View style={styles.firstLayer}>
               <FontAwesomeIcon
                  icon={icon}
                  size={sizes.historySymbolSize}
                  color={color}
                  style={styles.font}
               />
               <View style={styles.secondLayer}>
                  <View style={styles.thirdLayer1}>
                     <Text
                        style={[
                           styles.textMedium,
                           styles.textBold,
                           { marginRight: 30, width: 150 },
                        ]}
                     >
                        {category}
                     </Text>
                     <Text
                        style={[
                           { color: typeColor, width: 90 },
                           styles.textBold,
                        ]}
                     >
                        {"NGN " + amount}
                     </Text>
                  </View>

                  <View style={styles.thirdLayer2}>
                     <Text style={{ color: "grey" }}> {type}</Text>
                     <Text style={{ color: "grey" }}>{dateCreated} </Text>
                  </View>
               </View>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   firstLayer: {
      flexDirection: "row",
   },
   font: {
      marginRight: 30,
   },
   secondLayer: {
      flexDirection: "column",
   },
   thirdLayer1: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
   thirdLayer2: {
      flexDirection: "row",
      justifyContent: "space-around",
   },
   miniContainer2: {
      flexDirection: "column",
      marginVertical: 10,
      marginHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.1)",
   },
   textBold: {
      fontWeight: "bold",
   },
   textLarge: {
      fontSize: 22.4,
   },
   textMedium: {
      fontSize: 15,
   },
   textSmall: {
      fontSize: 11.2,
   },
});
