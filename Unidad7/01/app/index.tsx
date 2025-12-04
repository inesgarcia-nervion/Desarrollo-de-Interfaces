import { Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function Counter() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, secondsLeft]);


  
  const toggleRunning = () => {
    setIsRunning(prev => !prev);
  };


  const resetTimer = () => {
    setSecondsLeft(60);
    setIsRunning(false);
  };


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Temporizador: {secondsLeft}
      </Text>
      <Button title="Start/Stop" onPress={toggleRunning} />
      <Button title="Reset" onPress={resetTimer} />
    </View>
  );
}
