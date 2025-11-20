import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TarjetaProducto } from './views/TarjetaProducto';

export default function Index() {

  const [cantidad, setCantidad] = useState(0);

  const productos = [
    {
      id: "1",
      name: "Smartwatch X",
      price: 185.99,
      image: "https://m.media-amazon.com/images/I/71C3rHLQItL._AC_SL1347_.jpg"
    },
    {
      id: "2",
      name: "Wireless Earebbs",
      price: 79.99,
      image: "https://m.media-amazon.com/images/I/41JPxCizqNL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: "3",
      name: "Compact Dron",
      price: 349.99,
      image: "https://m.media-amazon.com/images/I/51QIRyL+TKL._AC_UF894,1000_QL80_.jpg"
    },
    {
      id: "4",
      name: "Keyboard",
      price: 129.99,
      image: "https://i.blogs.es/afcf1f/comprar-teclado-mars-gaming-al-mejor-precio/650_1200.jpg"
    }
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Nuestros Productos</Text>

        <View style={styles.cartContainer}>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/107/107831.png" }}
            style={styles.cartIcon}
          />
          {cantidad > 0 && (
            <View style={styles.circulo}>
              <Text style={styles.text}>{cantidad}</Text>
            </View>
          )}
        </View>
      </View>   

      {/* GRID */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TarjetaProducto
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={() => setCantidad(cantidad + 1)}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartIcon: {
    width: 50,
    height: 50
  },
  cartNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    color: "red"
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40
  },
  circulo: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  }
});
