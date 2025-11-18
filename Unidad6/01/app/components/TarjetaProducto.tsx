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
        <View style={styles.card}>
            <Image source={{ uri: image}} style={styles.image}/>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{price}</Text>

            <BotonPersonalizado
                label='Add to cart'
                onPress={onAddToCart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: 200
    },
    image: {
        width: 120,
        height: 140,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center'
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    }
});