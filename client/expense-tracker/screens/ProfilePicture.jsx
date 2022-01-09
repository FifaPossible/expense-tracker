import React from "react";
import {
   Image,
   View,
   StyleSheet,
   Dimensions,
   StatusBar,
   TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../utils/variables";

export default class ProfilePicture extends React.Component {
   goBack = () => {
      const { navigation } = this.props;
      navigation.goBack();
   };
   render() {
      const { route } = this.props;
      const imgUri = route.params.imgUri;
      const width = Dimensions.get("screen").width;
      const screenHeight = Dimensions.get("screen").height;
      const height = screenHeight / 2;

      const imgUriArray = imgUri.split("/");
      const stat = imgUriArray[imgUriArray.length - 1];
      let status = stat;
      if (stat === "undefined") {
         status = "null";
      }

      return (
         <View style={styles.container}>
            <TouchableOpacity onPress={this.goBack}>
               <FontAwesomeIcon
                  size={30}
                  icon={faArrowLeft}
                  style={styles.icon}
               />
            </TouchableOpacity>
            <StatusBar backgroundColor={"black"} />
            <View style={styles.absoluteCenter}>
               {status !== "null" && (
                  <Image
                     source={{
                        uri: imgUri,
                     }}
                     style={[
                        styles.profilePicture,
                        { width: width, height: height },
                     ]}
                  />
               )}
               {status === "null" && (
                  <FontAwesomeIcon
                     icon={faUserCircle}
                     size={width}
                     style={[
                        styles.profilePicture,
                        { color: colors.secondary },
                     ]}
                  />
               )}
               {/* {status === "undefined" && (
                  <FontAwesomeIcon
                     icon={faUserCircle}
                     size={width}
                     style={[
                        styles.profilePicture,
                        { color: colors.secondary },
                     ]}
                  />
               )} */}
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   absoluteCenter: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   icon: {
      color: "white",
      fontWeight: "bold",
      marginTop: 30,
   },
   container: {
      flex: 1,
      backgroundColor: "black",
   },
   profilePicture: {
      width: 200,
      height: 200,
   },
});
