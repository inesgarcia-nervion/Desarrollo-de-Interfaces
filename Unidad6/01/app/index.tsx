import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TarjetaProducto } from "./components/TarjetaProducto";

export default function Index() {
  return (
    <View style={styles.grid}>
        <TarjetaProducto
          name="Smartwatch X"
          price={185.99}
          image="https://m.media-amazon.com/images/I/71C3rHLQItL._AC_SL1347_.jpg"
          onAddToCart={() => console.log("Producto añadido")}
        />
        <TarjetaProducto
          name="Wireless Earebbs"
          price={79.99}
          image="https://m.media-amazon.com/images/I/41JPxCizqNL._AC_UF1000,1000_QL80_.jpg"
          onAddToCart={() => console.log("Producto añadido")}
        />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
      padding: 16,
      alignItems: 'center',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: 50
  },
});
