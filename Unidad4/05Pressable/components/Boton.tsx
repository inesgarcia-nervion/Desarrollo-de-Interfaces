import React from 'react';
import { View, Pressable, Text } from 'react-native';


function Boton({ texto }: { texto: string }) {
  return (
    <View style={{ margin: 5 }}>
      <Pressable style={{ backgroundColor: "#0867fff", padding: 10, borderRadius: 10 }} >
        <Text style={{ color: 'white', textAlign: 'center' }}>{texto}</Text>
      </Pressable>
    </View>
  );
}

export default Boton;