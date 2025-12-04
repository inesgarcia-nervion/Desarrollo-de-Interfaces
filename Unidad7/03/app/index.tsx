import { Text, View, FlatList } from "react-native";
import {useEffect, useRef} from "react";


const DATA = Array.from({length: 100}, (_, i) => ({
  id: i.toString(),
  title: `Elemento ${i + 1}`,
}));

useEffect(() => {
  
}, []);


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList 
      data={DATA} 
      keyExtractor={(item) => item.id} 
      renderItem={({item}) => <Text>{item.title}</Text>}
      />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
