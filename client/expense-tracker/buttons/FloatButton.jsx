import React, { useState } from "react";
import { View } from "react-native";
import { FAB, Portal } from "react-native-paper";

export default function FloatButton({ navigation }) {
   const [isScreenFocused, setIsScreenFocused] = useState(true);
   const [fabIsOpen, setFabIsOpen] = useState(false);

   const gotoNewRecord = () => {
      navigation.navigate("New record");
   };

   return (
      <View>
         <Portal>
            <FAB.Group
               visible={isScreenFocused}
               open={fabIsOpen}
               onStateChange={({ open }) => setFabIsOpen(open)}
               icon={fabIsOpen ? "close" : "plus"}
               actions={[
                  {
                     icon: "file",
                     label: "New record",
                     onPress: gotoNewRecord,
                  },
               ]}
            />
         </Portal>
      </View>
   );
}
