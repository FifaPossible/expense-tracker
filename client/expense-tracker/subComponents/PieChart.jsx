import React from "react";
import { View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function PieChartComponent({ pieData }) {
   const chartConfig = {
      color: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
   };

   const screenWidth = Dimensions.get("window").width;

   return (
      <View>
         <PieChart
            data={pieData}
            width={screenWidth - 20}
            height={200}
            chartConfig={chartConfig}
            accessor="total"
            backgroundColor="transparent"
         />
      </View>
   );
}
