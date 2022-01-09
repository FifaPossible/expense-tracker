import * as React from "react";
import {
   Text,
   View,
   Image,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   Dimensions,
   KeyboardAvoidingView,
   ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { colors, sizes, serverUrl } from "../utils/variables";
import { userLoggedOut, userUpdated } from "../reducers/userReducer";
export default function UserProfile({ navigation }) {
   const [password, setPassword] = React.useState("");
   const [newPassword, setNewPassword] = React.useState("");
   const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
   const [errorMessage, setErrorMessage] = React.useState("");
   const [error, setError] = React.useState(false);
   const [success, setSuccess] = React.useState(false);
   const [successMessage, setSuccessMessage] = React.useState("");
   const [profileImage, setProfileImage] = React.useState(null);

   const user = useSelector((state) => state.user.user);
   const dispatch = useDispatch();

   const screenWidth = Dimensions.get("screen").width;
   const screenHeight = Dimensions.get("screen").height;
   React.useEffect(() => {
      if (user.profilePicture !== undefined) {
         setProfileImage(user.profilePicture);
      }
   }, []);

   const logout = () => {
      dispatch(userLoggedOut());
      navigation.navigate("Login");
   };

   const updatePassword = (text) => {
      setPassword(text);
   };

   const updateNewPassword = (text) => {
      setNewPassword(text);
   };

   const updateConfirmNewPassword = (text) => {
      setConfirmNewPassword(text);
   };

   const changePassword = async () => {
      if (password === "") {
         setError(true);
         setErrorMessage("Password field is required");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else if (newPassword === "") {
         setError(true);
         setErrorMessage("New password field is required");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else if (confirmNewPassword === "") {
         setError(true);
         setErrorMessage("Confirm new password field is required");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else if (newPassword.localeCompare(confirmNewPassword) !== 0) {
         setError(true);
         setErrorMessage("The two password doesn't match");
         setTimeout(() => {
            setError(false);
         }, 6000);
      } else {
         setError(false);
         const credentials = { password, newPassword, user };
         try {
            const res = await axios.post(
               serverUrl + "/changePassword",
               credentials
            );
            if (res.status === 201) {
               setError(true);
               setErrorMessage(res.data);
               setPassword("");
               setNewPassword("");
               setConfirmNewPassword("");
               setTimeout(() => {
                  setError(false);
               }, 6000);
            }
            if (res.status === 200) {
               setSuccess(true);
               setSuccessMessage(res.data);
               setPassword("");
               setNewPassword("");
               setConfirmNewPassword("");
               setTimeout(() => {
                  setSuccess(false);
                  navigation.navigate("Home");
               }, 6000);
            }
         } catch (err) {
            setError(true);
            setErrorMessage(
               "Oops! Could not connect to server, check your internet connection"
            );
            setTimeout(() => {
               setError(false);
            }, 6000);
         }
      }
   };

   const uploadProfilePicture = async () => {
      const permissionResult =
         await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
         alert("Sorry we need camera roll permission to make this work");
      }
      if (permissionResult.granted === true) {
         const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowEditing: true,
         });

         if (!response.cancelled) {
            try {
               const imgName = response.uri.split(".");
               const format = imgName[imgName.length - 1];
               const inspectedFormat = format === "jpg" ? "jpeg" : format;
               const img = {
                  uri: response.uri,
                  type: `image/${inspectedFormat}`,
                  name: `${user.username}_${
                     user._id
                  }_${new Date().getTime()}_profilePicture.${inspectedFormat}`,
               };

               const formData = new FormData();
               formData.append("user", JSON.stringify(user));
               formData.append("profileImage", img);

               const res = await axios.post(
                  serverUrl + "/uploadProfilePicture",
                  formData,
                  {
                     headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                     },
                  }
               );
               const userObject = res.data;
               dispatch(userUpdated(userObject));
               setProfileImage(userObject.profilePicture);
            } catch (e) {
               setError(true);
               setErrorMessage(
                  "Oops! Could not connect to server, check your internet connection"
               );
               setTimeout(() => {
                  setError(false);
               }, 6000);
            }
         }
      }
   };

   const viewProfilePicture = () => {
      navigation.navigate("Profile picture", {
         imgUri: `${serverUrl}/profile_pictures/${profileImage}`,
      });
   };

   return (
      <ScrollView>
         <View>
            <View style={styles.miniContainer1}>
               <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} />
               </TouchableOpacity>
               <Text style={styles.heading}>User profile</Text>
            </View>

            <View style={styles.miniContainer2}>
               <View style={styles.absoluteCenter}>
                  {profileImage === null && (
                     <TouchableOpacity onPress={viewProfilePicture}>
                        <FontAwesomeIcon
                           icon={faUserCircle}
                           size={80}
                           style={[
                              styles.profilePicture,
                              { color: colors.secondary },
                           ]}
                        />
                     </TouchableOpacity>
                  )}
                  {profileImage !== null && (
                     <TouchableOpacity onPress={viewProfilePicture}>
                        <Image
                           resizeMode={"cover"}
                           style={styles.profilePicture}
                           source={{
                              uri: `${serverUrl}/profile_pictures/${profileImage}`,
                           }}
                        />
                     </TouchableOpacity>
                  )}
               </View>
               <View style={styles.userDetails}>
                  <Text style={styles.textInputLabel}>Username</Text>
                  <Text style={styles.textInput}>{user.username}</Text>
                  <Text style={styles.textInputLabel}>Email</Text>
                  <Text style={styles.textInput}>{user.email}</Text>
                  <TouchableOpacity
                     style={[styles.pictureButton]}
                     onPress={uploadProfilePicture}
                  >
                     <Text style={styles.buttonText}>
                        Update profile picture
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={[styles.pictureButton]}
                     onPress={viewProfilePicture}
                  >
                     <Text style={styles.buttonText}>View profile picture</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <TouchableOpacity
               style={[styles.button, { backgroundColor: "red" }]}
               onPress={logout}
            >
               <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>

            <View style={styles.title}>
               <Text>PASSWORD CHANGE</Text>
               <Text style={[{ fontSize: 12, color: "rgba(0,0,0,0.6)" }]}>
                  Leave password empty, when you don't want to change it.
               </Text>
            </View>
            {error && <Text style={styles.error}>{errorMessage}</Text>}
            {success && <Text style={styles.success}>{successMessage}</Text>}
            <KeyboardAvoidingView>
               <View>
                  <Text style={styles.textInputLabel}>Password</Text>
                  <TextInput
                     style={styles.textInput}
                     onChangeText={updatePassword}
                     secureTextEntry={true}
                     value={password}
                  />
               </View>
               <View>
                  <Text style={styles.textInputLabel}>New password</Text>
                  <TextInput
                     style={styles.textInput}
                     onChangeText={updateNewPassword}
                     secureTextEntry={true}
                     value={newPassword}
                  />
               </View>
               <View>
                  <Text style={styles.textInputLabel}>
                     Confirm your new password
                  </Text>
                  <TextInput
                     style={styles.textInput}
                     onChangeText={updateConfirmNewPassword}
                     secureTextEntry={true}
                     value={confirmNewPassword}
                  />
               </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
               onPress={changePassword}
               style={[styles.button, { backgroundColor: "green" }]}
            >
               <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   absoluteCenter: {
      justifyContent: "center",
      alignItems: "center",
   },
   button: {
      marginHorizontal: 10,
      marginVertical: 25,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      borderRadius: 5,
      shadowColor: sizes.shadowColor,
      shadowOffset: sizes.shadowOffset,
      shadowRadius: sizes.shadowRadius,
   },
   buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 15,
   },
   error: {
      color: "red",
      // fontWeight: "bold",
   },
   success: {
      color: "green",
      // fontWeight: "bold",
   },
   heading: {
      fontSize: sizes.headers,
      color: colors.textPrimary,
      fontWeight: "bold",
   },
   icon: {
      color: colors.textPrimary,
      margin: 10,
      marginRight: 30,
      fontWeight: "bold",
   },
   miniContainer1: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondary,
      paddingVertical: 8,
      marginBottom: 10,
   },
   miniContainer2: {
      flexDirection: "row",
   },
   pictureButton: {
      marginHorizontal: 10,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      borderRadius: 5,
      padding: 3,
      backgroundColor: colors.secondary,
      shadowColor: sizes.shadowColor,
      shadowOffset: sizes.shadowOffset,
      shadowRadius: sizes.shadowRadius,
   },
   profilePicture: {
      width: 80,
      height: 80,
      borderRadius: 40,
   },
   textInput: {
      height: 32,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.2)",
      marginBottom: 5,
      fontSize: 17,
   },
   textInputLabel: {
      fontSize: 13,
      color: "rgba(0,0,0,0.4)",
      marginTop: 10,
   },
   title: {
      marginVertical: 20,
      marginHorizontal: 10,
   },
   userDetails: {
      marginHorizontal: 10,
   },
});
