import React, { useState } from "react";
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   KeyboardAvoidingView,
   ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import Axios from "axios";

import FormTextInput from "../inputs/FormTextInput";
import ActionButton from "../buttons/ActionButton";
import { colors, serverUrl } from "../utils/variables";
import { userLoggedIn } from "../reducers/userReducer";
import { fetchAccounts } from "../reducers/accountSlice";
import { fetchIncomeExpense } from "../reducers/incomeExpenseSlice";

export default function Signup({ navigation }) {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);
   const [clientValidationErrors, setClientValidationErrors] = useState("");

   const handleChangeUsername = (username) => {
      setUsername(username);
   };

   const handleChangeEmail = (email) => {
      setEmail(email);
   };

   const handleChangePassword = (password) => {
      setPassword(password);
   };

   const handleChangeConfirmPassword = (confirmPassword) => {
      setConfirmPassword(confirmPassword);
   };

   const dispatch = useDispatch();

   const handleSignUp = async () => {
      const emailRegex = /\S+@\S+\.\S+/;
      if (username === "") {
         setError(true);
         const noUsername = "username field is required";
         setClientValidationErrors(noUsername);
      } else if (email === "") {
         setError(true);
         const noEmail = "email field is required";
         setClientValidationErrors(noEmail);
      } else if (password === "") {
         setError(true);
         const noPassword = "password field is required";
         setClientValidationErrors(noPassword);
      } else if (confirmPassword === "") {
         setError(true);
         const noConfirmPassword = "confirm password field is required";
         setClientValidationErrors(noConfirmPassword);
      } else {
         if (!emailRegex.test(email)) {
            setError(true);
            const invalidEmail = "invalid email syntax";
            setClientValidationErrors(invalidEmail);
         } else if (password.localeCompare(confirmPassword) !== 0) {
            setError(true);
            setClientValidationErrors("the two password does not match");
         } else {
            setError(false);
            try {
               const lUsername = username.toLowerCase(),
                  lEmail = email.toLowerCase(),
                  lPassword = password.toLowerCase(),
                  lConfirmPassword = confirmPassword.toLowerCase();
               const credentials = {
                  username: lUsername,
                  email: lEmail,
                  password: lPassword,
                  confirmPassword: lConfirmPassword,
               };

               setIsLoading(true);
               const res = await Axios.post(serverUrl + "/signup", credentials);
               if (res.data.status === "success") {
                  dispatch(userLoggedIn(res.data.user));
                  const user = res.data.user;
                  dispatch(fetchAccounts({ user }));
                  dispatch(fetchIncomeExpense());
                  setTimeout(() => {
                     setUsername("");
                     setEmail("");
                     setPassword("");
                     setConfirmPassword("");
                     navigation.navigate("Home page");
                  }, 2000);
               } else if (res.status === 201) {
                  setIsLoading(false);
                  setError(true);
                  setClientValidationErrors(res.data);
               }
            } catch (err) {
               setIsLoading(false);
               setError(true);
               setClientValidationErrors(
                  "Oops! Could not connect to server, check your internet connection"
               );
            }
         }
      }
   };

   const gotoLogin = () => {
      navigation.navigate("Login");
   };

   return (
      <View style={styles.container}>
         <FontAwesomeIcon
            icon={faUserCircle}
            size={160}
            style={styles.userIcon}
         />
         <View>
            {error && (
               <Text style={styles.errorMessage}>{clientValidationErrors}</Text>
            )}
         </View>
         <KeyboardAvoidingView>
            <FormTextInput
               placeholder="Username"
               onChangeText={handleChangeUsername}
               value={username}
            />
            <FormTextInput
               placeholder="Email"
               onChangeText={handleChangeEmail}
               value={email}
            />
            <FormTextInput
               placeholder="Password"
               onChangeText={handleChangePassword}
               secureTextEntry={true}
               value={password}
            />
            <FormTextInput
               placeholder="Confirm Password"
               onChangeText={handleChangeConfirmPassword}
               secureTextEntry={true}
               value={confirmPassword}
            />
         </KeyboardAvoidingView>
         <View>
            {isLoading && (
               <ActivityIndicator size="large" color={colors.secondary} />
            )}
            {!isLoading && (
               <ActionButton text="Sign up" onPress={handleSignUp} />
            )}
         </View>
         <View style={styles.loginSignUp}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={gotoLogin}>
               <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,225,0,0.02)",
   },
   errorMessage: {
      color: "red",
      fontWeight: "bold",
   },
   link: {
      color: "blue",
      fontWeight: "bold",
   },
   loginSignUp: {
      flexDirection: "row",
   },
   userIcon: {
      color: colors.secondary,
   },
});
