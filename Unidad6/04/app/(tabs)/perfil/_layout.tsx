import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { withLayoutContext  } from 'expo-router';
import{SafeAreaView} from 'react-native-safe-area-context';

const {Navigator} = createMaterialTopTabNavigator();
const MaterialTopsTabs = withLayoutContext(Navigator);

export default function PerfilLayout() {
    return (
        // Usamos SafeAreaView para envolver el contenido de la pestaña anidada
        // Usamos 'edges' para aplicar el padding solo arriba si fuera necesario
        // aunque la vista contenedora (Views) ya tiene flex:1.
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} edges={['top']}>
            <MaterialTopsTabs
                screenOptions={{
                    tabBarActiveTintColor: 'purple' ,
                    tabBarIndicatorStyle: { backgroundColor: 'purple', height: 3 },
                    tabBarLabelStyle: { fontWeight: 'bold' },
                }}
            >
                <MaterialTopsTabs.Screen
                    name="index"
                    options={{ title: 'Posts' }}
                />
                <MaterialTopsTabs.Screen
                    name="galeria"
                    options={{ title: 'Galeria' }}
                />
            </MaterialTopsTabs>
        </SafeAreaView>
    );
}