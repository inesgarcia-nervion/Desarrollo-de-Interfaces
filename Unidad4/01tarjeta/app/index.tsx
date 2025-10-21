import { Image, StyleSheet, Text, View } from "react-native";


export default function Index() {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require('../assets/images/perro.png')}></Image>
      <Text style={styles.name}>Inés García </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CBC0AD',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    margin: 20
  },
  avatar: {
      width: 200,
      height: 200,
      borderWidth:1,
      borderRadius:300,
      margin: 5
  },
  name: {
      fontSize:30
  }
}

)

