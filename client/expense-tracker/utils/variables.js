import { Platform } from "react-native";

export const colors = {
   secondary: "#73C2FB",
   textPrimary: "#fff",
   fontSecondary: "rgba(0,225,0,1)",
   red: "rgba(225,0,0,1)",
   green: "rgba(0,225,0,1)",
   more: "rgba(0,0,0,0.45)",
};

export const sizes = {
   historySymbolSize: 32,
   headers: 20,
   borderWidth: 1,
   borderStyle: "solid",
   borderColor: "rgba(0,0,0,0.2)",
   shadowColor: "rgba(0,0,0,0.2)",
   shadowRadius: 5,
   shadowOffset: { width: 5, height: 5 },
   inputHeight: 50,
};

export const serverUrl =
   Platform.OS === "android"
      ? "http://192.168.43.206:30000"
      : "http://localhost:30000";
