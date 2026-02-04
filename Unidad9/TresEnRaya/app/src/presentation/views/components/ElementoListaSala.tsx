import React from 'react';
import { View, Text, Button } from 'react-native';
import { Room } from '../../../domain/entities/Room';

type Props = {
  sala: Room;
  onUnirse: (idSala: string) => void;
};

const ElementoListaSala: React.FC<Props> = ({ sala, onUnirse }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, padding: 8, borderWidth: 1, borderRadius: 8 }}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{sala.nombre}</Text>
      <Text>{sala.jugadoresActuales}/{sala.jugadoresMaximos}</Text>
    </View>
    <Button
      title="Unirse"
      onPress={() => onUnirse(sala.id)}
      disabled={sala.estaLlena}
    />
  </View>
);

export default ElementoListaSala;
