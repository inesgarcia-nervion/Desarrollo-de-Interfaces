import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatViewModel } from '../Viewmodels/ChatViewModel';

export default function ChatView() {
  const { messages, nombre, mensaje, setNombre, setMensaje, send, connected, loading, error } = useChatViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Estado: {connected ? 'Conectado' : 'Desconectado'}</Text>
        {loading && <Text>Cargando...</Text>}
        {error && <Text style={{color:'red'}}>{error}</Text>}
        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
        <TextInput placeholder="Mensaje" value={mensaje} onChangeText={setMensaje} style={styles.input} />
        <Button title="Enviar" onPress={send} disabled={loading} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => `${item.nombre}-${item.mensaje}`}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.userText}>{item.nombre}:</Text>
            <Text>{item.mensaje}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputContainer: { marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  messageItem: { flexDirection: 'row', marginBottom: 10 },
  userText: { fontWeight: 'bold', marginRight: 5 },
});