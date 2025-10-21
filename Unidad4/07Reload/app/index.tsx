import { Text, View, Pressable, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleReload = () => {
    setLoading(true);
    setLoaded(false);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 2000);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "purple",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
        onPress={handleReload}
      >
        <Ionicons name="reload" size={24} color="white" />
        <Text
          style={{
            fontSize: 16,
            color: "white",
            marginLeft: 8,
          }}
        >
          Recarga
        </Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" color="purple" />}

      {loaded && !loading && (
        <Text
          style={{
            color: "green",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Cargado
        </Text>
      )}
    </View>
  );
}