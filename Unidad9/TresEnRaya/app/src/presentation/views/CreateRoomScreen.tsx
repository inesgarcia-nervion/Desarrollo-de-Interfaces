import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

type Props = {
  onCrear: (nombre: string) => void;
};

const CreateRoomScreen: React.FC<Props> = ({ onCrear }) => {
  const [nombre, setNombre] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        placeholder="Nombre de la sala"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 16 }}
      />
      <Button title="Crear" onPress={() => onCrear(nombre)} disabled={!nombre} />
    </View>
  );
};

export default CreateRoomScreen;
