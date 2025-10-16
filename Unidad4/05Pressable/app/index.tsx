import { Pressable, Text, View } from "react-native";
import Boton from "@/components/Boton";


export default function Index() { 
  return(
    <View
      style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
      }}
    >
      <view style = {{flexDirection: "row"}}>
      <Boton texto="Hola" />
      <Boton texto="Que" />
      <Boton texto="Tal" />
      <Boton texto="Estas" />
      </view>
    </View>
  )


}