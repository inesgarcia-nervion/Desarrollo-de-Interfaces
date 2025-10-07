import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const Index = () => {


  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);


  const handlePress1 = () => {
    setCount(count + 1);
    const newTotal = total + 1;
    setTotal(newTotal);

    if (newTotal % 10 == 0) {
      Alert.alert("¡Has alcanzado 10 interacciones!");
    }
  };


  const handlePress2 = () => {
    setCount(count - 1);
    const newTotal = total + 1;
    setTotal(newTotal);

    if (newTotal % 10 == 0) {
      Alert.alert("¡Has alcanzado 10 interacciones!");
    }
  };

  

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Contador: {count}
      </Text>
      <Pressable onPress={handlePress1} style={styles.buttonIncrementar}>
        <Text style={styles.buttonText}>Incrementar</Text>
        <Ionicons name="add-circle" size={24} color="white" />
      </Pressable>
      <Pressable onPress={handlePress2} style={styles.buttonDecrementar}>
        <Text style={styles.buttonText}>Decrementar</Text>
        <Ionicons name="remove-circle" size={24} color="white" />
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonIncrementar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
  },
  buttonDecrementar: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});


export default Index;
