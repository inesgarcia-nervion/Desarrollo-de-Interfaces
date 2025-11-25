import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function index(){
    return (
      <View>

        <Text style={styles.text}>2.2. Pestaña Anidada: POSTS</Text>

      </View>
  );
}



const styles = StyleSheet.create({
  text: {
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10
  }
});