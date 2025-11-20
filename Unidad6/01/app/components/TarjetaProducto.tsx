import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { BotonPersonalizado } from './BotonPersonalizado';

type Props = {
    name: string,
    price: number,
    image: string;
    onAddToCart : () => void;
};


export function TarjetaProducto({ name, price, image, onAddToCart}: Props) {
    return (
        <View style={{
            flex:1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
        }}>
            <View style={styles.card}>
                <Image style={styles.image} source={{ uri: image}} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>{price} €</Text>
                <BotonPersonalizado
                    label='Add to cart'
                    onPress={onAddToCart}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: 170,
        margin: 10
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 12,
        alignSelf: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center'
    }
});