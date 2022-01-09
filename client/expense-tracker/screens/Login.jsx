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
import { fetchHistory } from "../reducers/historySlice";

export default function Login({ navigation }) {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);
   const [validationErrors, setValidationErrors] = useState("");

   const handleChangeUsername = (username) => {
      setUsername(username);
   };

   const handleChangePassword = (password) => {
      setPassword(password);
   };

   const dispatch = useDispatch();

   const handleLogin = async () => {
      if (username === "") {
         setError(true);
         const noUsername = "username field is required";
         setValidationErrors(noUsername);
      } else if (password === "") {
         setError(true);
         const noPassword = "password field is required";
         setValidationErrors(noPassword);
      } else {
         setError(false);

         const lUsername = username.toLowerCase();
         const lPassword = password.toLowerCase();
         const credentials = {
            username: lUsername,
            password: lPassword,
         };

         try {
            setIsLoading(true);
            const res = await Axios.post(serverUrl + "/login", credentials, {
               timeout: 8000,
            });

            if (res.data.status === "noUser") {
               setIsLoading(false);
               setError(true);
               setValidationErrors(res.data.message);
            }
            if (res.data.status === "wrongPassword") {
               setIsLoading(false);
               setError(true);
               setValidationErrors(res.data.message);
            }
            if (res.data.status === "success") {
               dispatch(userLoggedIn(res.data.user));
               const user = res.data.user;
               dispatch(fetchAccounts({ user }));
               dispatch(fetchIncomeExpense());
               dispatch(fetchHistory());
               setTimeout(() => {
                  setIsLoading(false);
                  setPassword("");
                  setUsername("");
                  navigation.navigate("Home page");
               }, 2000);
            }
         } catch (err) {
            setIsLoading(false);
            setError(true);
            setValidationErrors(
               "Oops! Could not connect to server, check your internet connection"
            );
         }
      }
   };

   const gotoSignUp = () => {
      navigation.navigate("SignUp");
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
               <Text style={styles.errorMessage}>{validationErrors}</Text>
            )}
         </View>
         <KeyboardAvoidingView>
            <FormTextInput
               placeholder="Username"
               onChangeText={handleChangeUsername}
               value={username}
            />
            <FormTextInput
               placeholder="Password"
               onChangeText={handleChangePassword}
               secureTextEntry={true}
               value={password}
            />
         </KeyboardAvoidingView>
         <View>
            {isLoading && (
               <ActivityIndicator size="large" color={colors.secondary} />
            )}
            {!isLoading && <ActionButton text="Login" onPress={handleLogin} />}
         </View>
         <View style={styles.loginSignUp}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={gotoSignUp}>
               <Text style={styles.link}>Sign up</Text>
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
